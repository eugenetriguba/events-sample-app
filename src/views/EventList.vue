<template>
  <div>
    <h1>Events for {{ user.name }}</h1>

    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page > 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev Page
      </router-link>
      |
    </template>
    <template v-if="hasNextPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
      >
        Next Page
      </router-link>
    </template>
  </div>
</template>
<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";

export default {
  components: {
    EventCard
  },
  data() {
    return {
      perPage: 3
    };
  },
  created() {
    this.$store.dispatch("event/fetchEvents", {
      perPage: this.perPage,
      page: this.page
    });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.perPage;
    },
    ...mapState({
      event: state => state.event,
      user: state => state.user.user
    })
  }
};
</script>
