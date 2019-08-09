<template>
    <Page>
        <ActionBar title="test"/>
          <StackLayout>
            <Label width="30%" text="computed state doesn't changed" marginBottom="40"/>
            <Label width="30%" :text="label_text" />
          </StackLayout>
    </Page>
</template>

<script lang="ts">
  import * as application from 'tns-core-modules/application/application';
  import { Bluetooth } from 'nativescript-bluetooth';

  export default {
    data() {
      return {
      }
    },
    methods: {
    },
    computed: {
      label_text () {
        if(this.$store.state.isBtOn)
          return 'bt is on'
        else
          return 'bt is off'
      },
    },
    mounted() {
      console.log("mounted called")
      // get current Bluetooth state
      const bt = new Bluetooth()
      bt.isBluetoothEnabled().then((state) => {
        this.$store.commit('SET_BT_STATE', state)
      })
      // registerBroadcastReceiver Bluetooth state change event
      application.android.registerBroadcastReceiver(
        android.bluetooth.BluetoothAdapter.ACTION_STATE_CHANGED,
        (context, intent: android.content.Intent) => { 
          const state: number = intent.getIntExtra(android.bluetooth.BluetoothAdapter.EXTRA_STATE, 0)
          console.log('ACTION_STATE_CHANGED', new Date(), state)
          switch(state) {
            case android.bluetooth.BluetoothAdapter.STATE_OFF: {
              this.$store.commit('SET_BT_STATE', false)
              break
            }
            default: {
              this.$store.commit('SET_BT_STATE', true)
              break
            }
          }
        }
      )
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
