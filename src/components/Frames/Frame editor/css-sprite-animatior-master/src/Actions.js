export const updateCurrent = (value, dispatch) => {
    dispatch({
        type: "UPDATE_CURRENT",
        index: value
    });
};

export const updateWidthFrame = (value, dispatch) => {
    dispatch({
        type: "UPDATE_WIDTH_FRAME",
        index: value
    });
};

export const updateHightFrame = (value, dispatch) => {
    dispatch({
        type: "UPDATE_HIGHT_FRAME",
        index: value
    });
};

export const updateColor = (value, dispatch) => {
    dispatch({
        type: "UPDATE_COLOR",
        color: value
    });
};

export const updatePixel = (value, dispatch) => {
    dispatch({
        type: "UPDATE_PIXEL",
        index: value
    });
};

export const updateRowPixel = (value, dispatch) => {
    dispatch({
        type: "UPDATE_ROW_PIXEL",
        index: value
    });
};

export const updateColumnPixel = (value, dispatch) => {
    dispatch({
        type: "UPDATE_COLUMN_PIXEL",
        index: value
    });
};


export const updateAllPixel = dispatch => {
    dispatch({
        type: "UPDATE_All_PIXEL",
    });
};

export const updaterandomPixel = dispatch => {
    dispatch({
        type: "UPDATE_RANDOM_PIXEL",
    });
};

export const updateAllTransperentPixel = dispatch => {
    dispatch({
        type: "UPDATE_All_TRANSPERENT_PIXEL",
    });
};

export const shiftFrame = (value, dispatch) => {
    dispatch({
        type: "SHIFT_FRAME",
        direction: value
    });
};

export const saveFrame = dispatch => {
    dispatch({
        type: "SAVE_FRAME"
    });
};

export const addFrame = dispatch => {
    dispatch({
        type: "ADD_FRAME"
    });
};

export const newFrame = dispatch => {
    dispatch({
        type: "NEW_FRAME"
    });
};

export const copyFrame = dispatch => {
    dispatch({
        type: "COPY_FRAME"
    });
};

export const deleteFrame = dispatch => {
    dispatch({
        type: "DELETE_FRAME"
    });
};

export const exportFrames = dispatch => {
    dispatch({
        type: "EXPORT_FRAMES"
    });
};

export const pasteFrame = dispatch => {
    dispatch({
        type: "PASTE_FRAME"
    });
};

export const generateNewMatrix = dispatch => {
    dispatch({
        type: "GENERATE_NEW_MARTRIX"
    });
};

export const loadFrame = (value, size, index, dispatch) => {
    dispatch({
        type: "LOAD_FRAME",
        frame: value,
        size,
        index,
    });
};

export const SaveNewFrame = (dispatch) => {
    dispatch({
        type: "SAVE_NEW_FRAME",
    });
};

export const ChangeSendFrameFromAppSpeed = (value, dispatch) => {
    dispatch({
        type: "CHANGE_SEND_FRAME_FROM_APP_SPEED",
        index: value,
    });
};

export const NewUserAdded = (value, dispatch) => {
    dispatch({
        type: "NEW-USER_ADDED",
        index: value,
    });
};