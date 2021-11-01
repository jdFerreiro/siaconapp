<template>
  <MainHeader></MainHeader>
  <InternalMenu></InternalMenu>
  <div class="container row">
    <div class="col m12">
      <div class="progress" v-show="isLoading == true">
        <div class="indeterminate"></div>
      </div>
      <div v-if="this.$store.state.rolId == 1" v-show="!isLoading">
        <div class="teal white-text darken-4 center">
          <div class="row">
            <div class="col m10">
              <h5>Residencias</h5>
            </div>
            <div class="col m2">
                <button
              <a href="#!" class="white-text darken-4 center"
                ><i class="material-icons">add</i></a
              >
            </div>
          </div>
        </div>
        <table class="centered responsive-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Municipio</th>
              <th>Rif</th>
              <th>Administrador</th>
              <th colspan="2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in buildings" v-bind:key="item">
              <td>{{ item.nombre }}</td>
              <td>{{ item.direccion }}</td>
              <td>{{ item.county }}</td>
              <td>{{ item.identificacion }}</td>
              <td>{{ item.administrator }}</td>
              <td class="center">
                <a href="#!"><i class="material-icons">edit</i></a>
              </td>
              <td class="center">
                <a href="#!"><i class="material-icons">delete</i></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="this.$store.state.rolId != 1">Residencia</div>
    </div>
  </div>
</template>

<script>
import M from "materialize-css";
import MainHeader from "@/components/MainHeader.vue";
import InternalMenu from "@/components/InternalMenu.vue";

export default {
  name: "Residencia",
  components: {
    MainHeader,
    InternalMenu,
  },
  data() {
    return {
      buildings: [],
      isLoading: false,
    };
  },
  async mounted() {
    var sideElems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sideElems, null);

    this.isLoading = true;
    await this.axios.get("/building").then((response) => {
      if (response.data.success == 1) {
        this.buildings = response.data.data;
        console.log(this.buildings);
      } else {
        this.buildings = [];
      }
    });
    this.isLoading = false;
  },
};
</script>
