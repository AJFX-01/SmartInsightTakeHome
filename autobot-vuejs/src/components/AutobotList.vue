<template>
  <div class="autobot-container">
    <h1>Autobot List</h1>
    <div v-if="loading" class="loading">Loading Autobots...</div>
    
    <div v-else-if="!loading" class="empty">
      Total Autobots available : {{ autobotCount }}
    </div>

    <div v-if="error" class="error">{{ error }}</div>
    <ul v-if="autobots.length > 0">
      <li v-for="autobot in autobots" :key="autobot.id">
        <strong>{{ autobot.name }}</strong> ({{ autobot.username }})
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import api from "../api/axios";
import socket from "../socket.js"

const autobots = ref([]);
const loading = ref(true);
const error = ref(null);
const autobotCount = ref(0);

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
  socket.on("autobotCount", (count) => {
    console.log(`Autobot count: ${count}`);
    autobotCount.value = count;
  });

  onUnmounted(() => {
    socket.disconnect();
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
  font-size: 13px;
}

.empty {
  color: #6c757d;
  font-size: 16px;
}
</style>
