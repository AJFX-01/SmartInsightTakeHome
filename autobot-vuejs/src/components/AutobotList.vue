<template>
    <div>
        <h1>
            <ul>
                <li>

                </li>
            </ul>
        </h1>
    </div>
</template>

<script>
import api from '../api/axios';

export default {
    data() {

    },
    created() {
        this.fetchAutobots();
        this.$socket.on('Autobots count', (count) => {
            console.log('Autobot count:' ${count})
        });
    },
    methods: {
        async fetchAutobots() {
            try {
                const response = await api.get('/autobots');
                this.autobots = response.data;
                
            } catch (error) {
                console.error('Error occured trying to fetch autobots:',error.message);
            }
        }
    },
}
</script>