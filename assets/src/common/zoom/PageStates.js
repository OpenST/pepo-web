const PageStates = {
    LOADING                     : "LOADING",
    DOM_READY                   : "DOM_READY",

    SDK_PREPARED                : "SDK_PREPARED",
    PREPARING_SDK_FAILED        : "PREPARING_SDK_FAILED",

    SDK_INITIALIZED             : "SDK_INITIALIZED",
    SDK_INITIALIZATION_FAILED   : "SDK_INITIALIZATION_FAILED",


    MEETING_JOINED              : "MEETING_JOINED",
    JOIN_MEETING_FAILED         : "JOIN_MEETING_FAILED"
};

const FailedStates = [
    PageStates.PREPARING_SDK_FAILED
    , PageStates.SDK_INITIALIZATION_FAILED
    , PageStates.JOIN_MEETING_FAILED
];

export {PageStates, FailedStates};