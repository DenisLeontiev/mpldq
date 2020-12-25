<template>
    <section class="view-section view-section-cust-docs view-section--background p-b-70 p-t-70">
       <div class="view-container">
            <div class="view-grid view-grid--align-top">
                <div class="view-grid__column view-grid__column--8 view-grid__column-mob--12 p-t-40">
                    <h2 class="view-title view-title--h2 view-title--section text-medium">
                        {{title}}
                    </h2>

                    <ul class="view-competition-docs">
                        <li v-for="(item, index) in competition.documents" :key="index">
                            <img :src="require(`@/assets/images/file.svg`)" alt="doc">
                            <a :href="item.url" target="_blank">{{item.name}}</a>
                        </li>
                    </ul>
                </div>

                 <div class="view-grid__column view-grid__column--4 view-grid__column-mob--12">
                    <div class="view-competition-commission view-text__bordered m-b-0" 
                    v-if="competition.commissionlider !== null && competition.commission.secretar !== null 
                    && competition.commission.members.length > 0">
                        <div class="view-competition-commission__item">
                            <h3 class="view-title--h3">Голова КРК</h3>
                            <span>{{competition.commission.lider}}</span>
                        </div>
                        <div class="view-competition-commission__item">
                            <h3 class="view-title--h3">Секретар КРК</h3>
                            <span>{{competition.commission.secretar}}</span>
                        </div>
                        <div class="view-competition-commission__item">
                            <h3 class="view-title--h3">Члени Комісії</h3>
                            <span v-for="(member, index) in competition.commission.members" :key="index">{{member}}</span>
                        </div>
                    </div>    
                 </div>
            </div>
       </div>
    </section>
</template>

<script>
export default {
    props: {
        'title' : String,
        'competition': Object
    }
}
</script>