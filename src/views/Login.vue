<template>
  <div>
    <MainHeader></MainHeader>
    <MainMenu></MainMenu>
    <div class="row">
      <div class="col m12">
        <h5 class="center">Acceso de Usuarios</h5>
        <div class="col m5">
          <h5 class="center">Nuevos Usuarios</h5>
          <div class="col s6">
            <p class="subheader">¿Eres propietario?</p>
            <p>
              Si eres un propietario y requieres acceso al portal, comunícate
              con tu administrador para que te brinde el apoyo que necesitas.
            </p>
          </div>
          <div class="col s6">
            <p class="subheader">¿Eres un administrador</p>
            <p>
              Si eres un administrador y deseas regitrar tu condominio, haz
              click en el botón registrar y accede al formulario para registro
            </p>
          </div>
          <div class="col s6 right p10-right">
            <div class="center">
              <router-link to="/" class="btn blue darken-2 right"
                >Registro</router-link
              >
            </div>
          </div>
        </div>
        <div class="col m6 card-panel right">
          <form @submit.prevent="loginUser" id="frmLogin" method="POST">
            <div class="card-content">
              <h5 class="center">Usuarios Registrados</h5>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">mail_outline</i>
                  <input id="user_code" type="text" v-model="emailUser" />
                  <label for="user_code">Correo electrónico:</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">lock_outline</i>
                  <input
                    id="user_password"
                    type="password"
                    v-model="passUser"
                  />
                  <label for="user_password">Contraseña:</label> <br />
                </div>
              </div>
              <div class="row">
                <div class="right col s6">
                  <button
                    v-show="!isLoading"
                    class="right btn-small blue darken-2"
                    type="submit"
                  >
                    Iniciar Sesión <i class="material-icons right">security</i>
                  </button>
                </div>
              </div>
              <div v-show="isLoading" class="row">
                <div class="preloader-wrapper small active right">
                  <div class="spinner-layer spinner-green-only">
                    <div class="circle-clipper left">
                      <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                      <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                      <div class="circle"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import M from "materialize-css";
import MainMenu from "@/components/MainMenu.vue";
import MainHeader from "@/components/MainHeader.vue";

export default {
  name: "Login",
  components: {
    MainHeader,
    MainMenu,
  },
  data() {
    return {
      emailUser: "",
      passUser: "",
      isLoading: false,

      select_instances: [],
    };
  },
  created() {
    var elems = document.querySelectorAll("select");
    this.select_instances = M.FormSelect.init(elems, null);
  },
  methods: {
    async loginUser() {
      var payload = {
        email: this.emailUser,
        clave: this.passUser,
      };

      this.isLoading = true;
      await this.axios
        .post("/user/login", payload)
        .then((response) => {
          var result = response.data;
          if (result.success == 0) {
            M.toast({ html: result.message });
          } else {
            localStorage.setItem("token", result.token);

            var rolid = result.rolId;
            var statusid = result.rolId;
            var userid = result.userId;
            var username = result.userName;

            this.$store.commit("setAuthenticated", true);
            this.$store.commit("setUserData", {
              rolid,
              statusid,
              userid,
              username,
            });

            this.axios.defaults.headers.common["Authorization"] =
              "Bearer " + result.token;
            if (result.firstLogin) {
              M.toast({ html: "primera vez que se conecta" });

              // Se requiere aplicar para cambiar la contraseña en el primer login

              this.$router.push("/private");
            } else {
              this.$router.push("/private");
            }
          }
        })
        .catch((error) => {
          var data = error.response.data;
          M.toast({ html: "ERROR LOGIN: " + data.message });
        });
      this.isLoading = false;
    },
  },
};
</script>
