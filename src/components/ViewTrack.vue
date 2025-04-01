<template>
  <div class="music-list">
    <div v-for="(track, index) in tracks" :key="index" class="track">
      <button @click="playTrack(track)">▶</button>
      <span class="track-info">{{ track.name }}</span>
      <span class="time">{{ track.duration }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tracks: [
        { name: "Agust D – Moonlight", duration: "02:44" },
        { name: "Agust D – Daechwita", duration: "03:04" },
        { name: "Agust D – What Do You Think", duration: "03:51" },
        { name: "Jimin (지민) – Set Me Free", duration: "03:21" },
        { name: "J-hope – MORE", duration: "02:31" },
        { name: "J-hope – Hope World", duration: "03:22" },
        { name: "J-hope – P.O.P (Piece Of Peace) pt.1", duration: "02:53" },
        { name: "J-hope – Daydream", duration: "03:49" },
        { name: "J-hope – Base Line", duration: "01:30" }
      ]
    };
  },
  methods: {
    playTrack(track) {
      console.log(`Playing ${track.name}`);
    }
  }
};
</script>

<style scoped>
.music-list {
  padding: 20px;
  background: rgba(0, 0, 0, 0.2);
  flex: 1;
}

.track {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
  background: #c99dcb;
  margin-bottom: 5px;
  border-radius: 5px;
}

.track button {
  background: none;
  border: none;
  color: black;
  font-size: 18px;
  cursor: pointer;
}

.track-info {
  flex: 1;
  margin-left: 10px;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
}

.time {
  opacity: 0.5;
  margin-left: auto;
}

</style>
