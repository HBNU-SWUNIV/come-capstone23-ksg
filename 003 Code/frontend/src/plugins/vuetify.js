import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { createVuetify } from 'vuetify'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            dark: false,
            colors: {
              primary: colors.red.darken1, // #E53935
              secondary: colors.red.lighten4, // #FFCDD2
            }
          },
        },
      },
});

