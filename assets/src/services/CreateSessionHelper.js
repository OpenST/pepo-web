import $ from 'jquery';
import BasicHelper from '../helpers/basic';

class CreateSessionHelper {
    constructor( currentUserData ) {
        this.currentUserData = currentUserData;
        this.bindEvents();
    }

    getOstUserId() {
        const oThis = this;
        const user_id = oThis.currentUserData.logged_in_user.user_id;
        const ost_user_id = oThis.currentUserData.users[user_id].ost_user_id;
        return ost_user_id;
    }

    bindEvents = () => {
        const oThis = this;
        for (var k = 1; k < 30; k++) {
            $('#j-duration').append(`<option value="${k}"> ${k} </option>`);
        }
        $('#j-create-btn').click(() => {
            let createSessionModal = $('#create-session-modal');
            createSessionModal.modal('hide');
            oThis.perform();
        });
    }
    perform() {
        const oThis = this;
        var value = $('#j-spending-limit').val();
        oThis.higherUnitSpending = value;
        var index = document.getElementById("j-duration");
        var duration = index.options[index.selectedIndex].value;
        oThis.getDate(duration);
        $('#createSession').modal('show');
        $('body').off("click").on('click',function (e) {
            if( $('#createSession').length !== 0 ){
               $('#createSession').modal('hide');
            }
          });
        $("#expiry-label").text(oThis.expiry);

        oThis.convertSessionLimit(value)
            .then((limit) => {
                oThis.spendingLimit = limit;
                console.log("spending limit", limit);
                $("#spending-limit-label-lower").text(oThis.spendingLimit);
                $("#spending-limit-label-higher").text(value);
                $('#afterSession').modal('toggle');
                oThis.createSession();
            })
            .catch((error) => {
                oThis.spendingLimit = 0;
                console.error("error in spending limit function", error);
            })
    }
    makeCode(object) {

        let text = object;
        if (object && typeof object === 'object') {
            text = JSON.stringify(object);
        }
        $("#QrMainDiv").html('');
        $("#QrMainDiv").html('<div id="qrcode" class="QRCodeDiv "></div>');

        var qr = $("#qrcode")[0];
        console.log(qr);
        //$('#qrcode').qrcode(text);
        var qrcode = new QRCode(qr, {
            text: text,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
    createSession() {
        const oThis = this;
        let sdkDelegate = new OstWorkflowDelegate();

        sdkDelegate.requestAcknowledged = function (ostWorkflowContext, ostContextEntity) {
            console.log("request ack");
            const entity = ostContextEntity.qr_data;
            oThis.makeCode(entity);
        };

        sdkDelegate.flowComplete = function (ostWorkflowContext, ostContextEntity) {
            console.log(LOG_TAG, "createSessionHelper");
            console.log(LOG_TAG, "ostWorkflowContext :: ", ostWorkflowContext);
            console.log(LOG_TAG, "ostContextEntity :: ", ostContextEntity);
        };

        sdkDelegate.flowInterrupt = function (ostWorkflowContext, ostError) {
            console.log(LOG_TAG, "createSessionHelper");
            console.log(LOG_TAG, "ostWorkflowContext :: ", ostWorkflowContext);
            console.log(LOG_TAG, "ostError :: ", ostError);
        };

        console.log("Initiating OstWalletSdk.createSession with spendingLimit", oThis.higherUnitSpending, ". The higherUnitSpendingLimit is", oThis.higherUnitSpending);
        let workflowId = OstWalletSdk.createSession(
            oThis.getOstUserId(),
            parseInt(oThis.expiryTime.getTime()/1000),
            oThis.higherUnitSpending,
            sdkDelegate);
    }
    getDate(duration) {

        const oThis = this;
        oThis.expiryTime = new Date($.now());
        var days = parseInt(duration, 10);
        oThis.expiryTime.setDate(oThis.expiryTime.getDate() + days);
        oThis.expiry = oThis.expiryTime.toUTCString().slice(0,25);
        console.log("expiry", oThis.expiry);

    }
    convertSessionLimit(amount) {
        console.log("currentUserData :: function", this.getOstUserId());
        const ostUserId = this.getOstUserId();
        let directTransfer = BasicHelper.convertToBigNumber(0);
        return OstJsonApi.getToken(ostUserId)
            .then((data) => {
                if (!data) {
                    console.error("Token not found");
                    return Promise.resolve('0');
                }
                let decimals = data.token.decimals;
                let decimalBN = BasicHelper.convertToBigNumber(decimals);
                let multiplier = BasicHelper.convertToBigNumber(10).pow(decimalBN);
                let amountBN = BasicHelper.convertToBigNumber(amount);
                console.log("type ==> ",typeof(amountBN));
                directTransfer = amountBN.mul(multiplier);
                return Promise.resolve(directTransfer.toString());
            })
            .catch((err) => {
                console.error(err);
                return Promise.resolve('0');
            });
    }
}
export default CreateSessionHelper;