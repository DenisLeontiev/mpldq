<template>
  <main class="view-competition" v-if="competition.competitions[0]">
      <Info v-if="competition" :clinic="competition" :competitionId="competition.id"></Info>
      <Steps :title="'Етапи конкурсу'" :steps="competition.competitions[0].steps" :id="competition.competitions[0].id" :address="competition.address"></Steps>
      <Docs v-if="competition.competitions[0].commission && competition.competitions[0].documents.length > 0" :title="'Документи'" :competition="competition.competitions[0]"></Docs>
      <Candidates :title="'Кандидати'" v-if="competition.competitions[0].candidates.length > 0" :candidates="competition.competitions[0].candidates"></Candidates>
      <Latest v-if="competition.competitions.length > 0" :title="'Попередні конкурси'" :competitions="competition.competitions"></Latest>
      <Map v-if="competition" :title="'Карта'" :location="{lat: competition.latitude, lng: competition.longitude}"></Map>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Info from '@/components/ViewCompetition/competitionInfo'
import Steps from '@/components/ViewCompetition/competitionSteps';
import Docs from '@/components/ViewCompetition/competitionDocs';
import Candidates from '@/components/ViewCompetition/competitionCandidates';
import Latest from '@/components/ViewCompetition/competitionLatest';
import Map from '@/components/ViewCompetition/competitionMap';

export default {
    name: 'Competition',
    components: {
        Info,
        Steps,
        Docs,
        Candidates,
        Latest,
        Map
    },
    computed: mapGetters(['competition']),
    methods: mapActions(['fetchCompetition']),
    beforeCreate(){
        this.$emit('initPreloader')
    },
    watch: {
        competition : {
            immediate: false,
            handler: function(val){
                if(val.error) {
                    this.$route.meta.status = '404'
                    this.$emit('hidePreloader');
                } else {
                    this.$emit('hidePreloader')
                }
            }
        }
    },
    async mounted() {
        const path = window.location.pathname
        const slug = path.split("/clinics/")[1] 
        this.fetchCompetition({slug: slug});
    }
}
</script>