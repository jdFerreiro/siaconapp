<template>
  <nav class="teal white-text darken-2">
    <div class="nav-wrapper">
      <a href="#" data-target="mobileMenu" class="sidenav-trigger"
        ><i class="material-icons">menu</i></a
      >
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/">¿Quiénes somos?</router-link></li>
        <li><router-link to="/">Tarífas</router-link></li>
        <li><router-link to="/">Contácto</router-link></li>
      </ul>
      <ul class="right hide-on-med-and-down">
        <li><router-link to="/login">Ingresar</router-link></li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav teal white-text darken-2" id="mobileMenu">
    <li><router-link to="/">Inicio</router-link></li>
    <li><router-link to="/">¿Quiénes somos?</router-link></li>
    <li><router-link to="/">Tarífas</router-link></li>
    <li><router-link to="/">Contácto</router-link></li>
    <li class="white">-</li>
    <li><router-link to="/login">Ingresar</router-link></li>
  </ul>
</template>

<script>
import M from "materialize-css";

export default {
  name: "MainMenu",
  data() {
    return {
      instances: [],
    };
  },
  async mounted() {
    var elems = document.querySelectorAll(".sidenav");
    this.instances = M.Sidenav.init(elems, null);
  },
  created() {},
};
</script>
