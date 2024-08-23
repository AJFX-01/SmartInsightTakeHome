<template>
  <div class="autobot-container">
    <h1>Autobot List</h1>
    <div v-if="loading" class="loading">Loading Autobots...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <ul v-if="autobots.length > 0">
      <li v-for="autobot in autobots" :key="autobot.id">
        <strong>{{ autobot.name }}</strong> ({{ autobot.username }})
      </li>
    </ul>
    <div v-else-if="!loading && autobots.length === 0" class="empty">
      No Autobots available.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/axios";

const autobots = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchAutobots = async () => {
  try {
    const response = await api.get("/autobots");
    autobots.value = response.data;
  } catch (err) {
    error.value = "Error fetching Autobots: " + err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchAutobots();
  const socket = inject("$socket");
  socket.on("autobotCount", (count) => {
    console.log(`Autobot count: ${count}`);
  });
});
</script>

<style scoped>
.autobot-container {
  padding: 20px;
}

.loading {
  color: #007bff;
  font-size: 18px;
}

.error {
  color: #dc3545;
  font-size: 18px;
}

.empty {
  color: #6c757d;
  font-size: 16px;
}
</style>
