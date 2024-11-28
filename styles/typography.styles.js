import {
    PRIMARY_COLOR,
    PRIMARY_COLOR_TRANSPARENT,
    SECONDARY_COLOR,
    WARNING_COLOR,
    INFO_COLOR,
    DANGER_COLOR,
    SUCCESS_COLOR,
    LIGHT,
    DARK
} from "./constant";

import { StyleSheet } from "react-native";

export const typography = StyleSheet.create({
    textPrimary: {
        color: PRIMARY_COLOR
    },
    textSecondary: {
        color: SECONDARY_COLOR,
    },
    textLight: {
        color: LIGHT,
    },
    textDark: {
        color: DARK,
    },
    textDanger: {
        color: DANGER_COLOR,
    },
    textInfo: {
        color: INFO_COLOR
    },
    textWarning: {
        color: WARNING_COLOR
    },
    textSuccess: {
        color: SUCCESS_COLOR
    },
    textPrimaryTransparent: {
        color: PRIMARY_COLOR_TRANSPARENT,
    },
    textBold: {
        fontWeight: 'bold'
    },

    font12: {
        fontSize: 12
    },

    font14: {
        fontSize: 14
    },
    font16: {
        fontSize: 16
    },
    font20: {
        fontSize: 20
    },
    font40: {
        fontSize: 40
    },
    // uppercase,lowercase,capitalize
    textCapitalize: {
        textTransform: 'capitalize'
    }

})