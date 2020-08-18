module.exports = {
  prefix: '',
  separator: ':',
  purge: [
    './src/resources/lang/*.json',
    './src/resources/views/**/**/*.pug',
    './src/resources/views/**/*.pug',
    './src/resources/views/*.pug'
  ],
  theme: {
    screens: {
      // xs: '0px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1440px'
    },
    fontWeight: {
      regular: 400,
      'semi-bold': 500,
      bold: 600
    },
    fontFamily: {
      display: ['Poppins', 'Roboto', 'sans-serif'],
      body: ['Poppins', 'Roboto', 'sans-serif'],
    },
    fontSize: {
      base: "14px",
      xl: "48px",
      lg: "36px",
      md: "30px",
      sm: "24px",

      '10': '10px',
      '12': '12px',
      '18': '18px'
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
    },
    borderRadius: {
      '4': "4px",
      '6': "6px"
    },
    extend: {
      maxWidth: {
        '512': '512px',
        '400': '400px',
        '300': '300px',
        '350': '350px',
        '280': '280px'
      },
      colors: {
        primary: "#013c4d",
        'primary-soft': "#005E79",
        'primary-cta': "#194754",
        secondary: "#f3e5b1",
        danger: "#d5441c",
        cyan: '#9dd5cb',
        white: '#ffffff',

        grey: "#201f24",
        gray: "#F7F8FA",
        grey: {
          dark: "#d6dbe1",
          lite: "#e9e8e4",
          natural: "#7b7b7b",
          soft: "#B9B9B9",
          skin: "#aaaaaa"
        }
      },
      borderColor: theme => ({
        grey: {
          dark: theme('colors.grey.dark')
        }
      }),
      spacing: {
        '10': '10px',
        '15': '15px',
        '20': '20px',
        '25': '25px',
        '30': '30px',
        '50': '50px',
        '90': '90px',
        '100': '100px',
        '120': '120px',
        '200': '200px',
        '300': '300px',
      },
      inset: {
        '50': "50%"
      },
      boxShadow: {
        primary: "0px 1px 25px rgba(1, 60, 77, 0.1)"
      },
      fill: theme => ({
        'primary': theme('colors.primary'),
        'secondary': theme('colors.secondary')
      })
    }
  },
  variants: {
    fill: ['responsive', 'hover'],
    inset: ['responsive', 'hover', 'focus']
  },
  plugins: [],
}
