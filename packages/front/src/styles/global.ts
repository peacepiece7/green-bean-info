import { createGlobalStyle } from 'styled-components'

/**
 * CSS RESET : A (more) Modern CSS Reset
 * @see https://piccalil.li/blog/a-more-modern-css-reset/
 * @see https://ykss.netlify.app/translation/a_more_modern_css_reset/?utm_source=substack&utm_medium=email
 */
export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    body {
        width : 100%;
        margin : 0;
    }
    html {
        font-size : 62.5%; // 1rem = 10px
    }
    main,
    section {
        width : 100%;
        height: inherit;
    }


    html .my-wallet-prose-text {
        font-size: initial;
    }

    @media screen and (max-width: 768px) {
        html {
            font-size : 56.25%; // 1rem = 9px
        }

    }

    @media screen and (max-width: 480px) {
        html {
            font-size : 50%; // 1rem = 8px
        }
    }
`
