import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: 1, name: "Eugene Triguba" },
    categories: [
      "sustainability",
      "education",
      "food",
      "community",
      "nature",
      "animal welfare",
      "housing"
    ],
    event: {},
    events: [],
    totalPages: 0
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_TOTAL_PAGES(state, total) {
      state.totalPages = total;
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event);
      });
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          commit(
            "SET_TOTAL_PAGES",
            Math.ceil(response.headers["x-total-count"] / perPage)
          );
          commit("SET_EVENTS", response.data);
        })
        .catch(error => {
          console.log("An error occurred: " + error.response);
        });
    },
    fetchEvent({ commit, getters }, id) {
      var event = getters.getEventById(id);

      if (event) {
        commit("SET_EVENT", event);
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit("SET_EVENT", response.data);
          })
          .catch(error => {
            console.log("There was an error: " + error.response);
          });
      }
    }
  },
  modules: {},
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id);
    }
  }
});
