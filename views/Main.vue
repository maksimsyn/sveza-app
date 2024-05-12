<template lang="pug">
  main.page-content
    AppIntro
    AppAbout
    AppFeatures
    AppCarrier
    AppJoin
    AppContacts
</template>

<script>
  import sal from 'sal.js';
  import AppIntro from '@/components/ui/AppIntro/AppIntro';
  import AppAbout from '@/components/ui/AppAbout/AppAbout';
  import AppFeatures from '@/components/ui/AppFeatures/AppFeatures';
  import AppCarrier from '@/components/ui/AppCarrier/AppCarrier';
  import AppJoin from '@/components/ui/AppJoin/AppJoin';
  import AppContacts from '@/components/ui/AppContacts/AppContacts';

  export default {
    name: 'MainPage',
    components: { AppContacts, AppJoin, AppCarrier, AppFeatures, AppAbout, AppIntro },
    mounted() {
      sal();
    }
  };
</script>
