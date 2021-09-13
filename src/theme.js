const Colors = {
    white: '#ffffff',
    black: '#000000',
    main: '#ed847a',  // 메인컬러: 핑크
    grey: '#5e5e5e',
    red: '#e84118',
};

export const theme = {
    statusbar: Colors.black,
    statusbarText: Colors.white,
    background: Colors.white,
    headerBackground: Colors.main,
    headerText: Colors.white,
    errorText: Colors.red,

    // Spinner
    spinnerBackground: Colors.black,
    spinnerIndicator: Colors.white,

    // Button(Recording)
    btnBackground: Colors.white,
    btnTitle: Colors.black,
    
};

/*
const SetColor = ({ emoji }) => {
    if (emoji == images.verygood || images.happy || images.pleased || images.fantastic || images.great)
        return '#54b492';
    else if (emoji == images.good || images.pound || images.comfortable || images.fun || images.excited)
        return '#8dbe41';
    else if (emoji == images.normal || images.boring || images.awkward || images.dontknow || images.umm)
        return '#64a1d0';
    else if (emoji == images.bad || images.frown || images.uncomfortable || images.blue || images.annoyed)
        return '#e8913c';
    else if (emoji == images.verybad || images.terrible || images.gross || images.sad || images.angry)
        return '#dc3439';
}
*/