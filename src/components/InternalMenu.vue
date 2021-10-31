<template>
  <ul
    v-for="item in menuUser"
    v-bind:key="item"
    :id="'dd' + item.id"
    class="dropdown-content"
  >
    <li v-for="child in item.childs" v-bind:key="child">
      <router-link :to="'/' + child.path">{{ child.name }}</router-link>
    </li>
  </ul>

  <ul id="ddUsuario" class="dropdown-content">
    <li>
      <router-link to="/userProfile">Perfil</router-link>
    </li>
    <li class="divider"></li>
    <li>
      <a href="#!" @click="$store.commit('logout')">Cerrar Sessión</a>
    </li>
  </ul>

  <div class="navbar-fixed">
    <nav class="teal white-text darken-2">
      <div class="nav-wrapper">
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"
          ><i class="material-icons">menu</i></a
        >
        <ul class="left hide-on-med-and-down">
          <li v-for="item in menuUser" v-bind:key="item">
            <a
              v-if="item.childs.length > 0"
              class="dropdown-trigger"
              href="#!"
              :data-target="'dd' + item.id"
              :tabindex="item.id"
            >
              {{ item.name }}<i class="material-icons right">arrow_drop_down</i>
            </a>
            <router-link v-if="item.childs.length == 0" :to="'/' + item.path">{{
              item.name
            }}</router-link>
          </li>
          <li>
            <a class="dropdown-trigger" href="#!" data-target="ddUsuario"
              ><i class="material-icons left">face</i> {{ $store.state.userName
              }}<i class="material-icons right">arrow_drop_down</i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>

  <ul class="sidenav" id="mobile-demo">
    <li class="card">
      <div class="user-view">
        <img src="@/assets/building.png" />
      </div>
      <router-link to="/userProfile"
        ><span class="teal-text name darken-3">{{
          $store.state.userName
        }}</span></router-link
      >
    </li>
    <li>
      <ul class="collapsible collapsible-accordion">
        <li v-for="item in menuUser" v-bind:key="item">
          <a v-if="item.childs.length > 0" class="collapsible-header">{{
            item.name
          }}</a>
          <div v-if="item.childs.length > 0" class="collapsible-body">
            <ul id="" class="">
              <li v-for="child in item.childs" v-bind:key="child">
                <router-link :to="'/' + child.path">{{
                  child.name
                }}</router-link>
              </li>
            </ul>
          </div>
          <router-link
            v-if="item.childs.length == 0"
            :to="'/' + item.path"
            class="collapsible-header"
            >{{ item.name }}</router-link
          >
        </li>
      </ul>
    </li>
    <li>
      <a href="#!" @click="$store.commit('logout')">Cerrar Sessión</a>
    </li>
  </ul>
</template>

<script>
import M from "materialize-css";

export default {
  name: "InternalMenu",
  data() {
    return {
      menuUser: [],
    };
  },
  async mounted() {
    var sideElems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sideElems, null);

    await this.axios
      .get("/menu/byRol/" + this.$store.state.rolId)
      .then((response) => {
        var result = response.data;
        if (result.success == 0) {
          this.$router.push("/login");
          M.toast({ html: result.message });
        } else {
          this.menuUser = result.data;
        }
      });
  },
  created() {},
  async updated() {
    var menuElems = document.querySelectorAll(".dropdown-trigger");
    var colapseElems = document.querySelectorAll(".collapsible");

    M.Dropdown.init(menuElems, null);
    M.Collapsible.init(colapseElems, null);
  },
  methods: {
    toggleChild(item) {
      item.isOpen = !item.isOpen;
    },
  },
};
</script>
