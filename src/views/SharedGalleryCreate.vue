<template>
  <div class="d-flex flex-column justify-center align-center mb-10" style="height: 100%">
    <span class="title">{{this.$route.params.id?'Edit':'Create'}} Gallery</span>
    <v-expansion-panels variant="popout" style="width: 50%" v-model="panel" mandatory>
      <form @submit="submitPanel1">
        <v-expansion-panel value="general">
          <v-expansion-panel-title>
            General
            <template v-slot:actions="{expanded}">
              <v-icon size="x-large" :icon="expanded?'mdi-menu-up':'mdi-menu-down'"></v-icon>
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div>
              <div class="d-flex align-center justify-space-around mt-2" style="width: 90%">
                <div style="width: 23%" class="d-flex justify-end">
                  <label>Event Name</label>
                </div>
                <div style="width: 70%">
                  <TextField type="text" v-model="name" :error="errors1.name"/>
                </div>
              </div>

              <div class="d-flex align-center justify-space-around mt-2" style="width: 90%">
                <div style="width: 23%" class="d-flex justify-end">
                  <label>Date</label>
                </div>
                <div style="width: 70%">
                  <TextField type="date" v-model="date" :error="errors1.date" :readOnly="readOnly"/>
                </div>
              </div>

              <div class="d-flex align-center justify-space-around mt-2" style="width: 90%">
                <div style="width: 23%" class="d-flex justify-end">
                  <label>Time</label>
                </div>
                <div style="width: 70%">
                  <TextField type="time" v-model="time" :error="errors1.time" :readOnly="readOnly"/>
                </div>
              </div>

              <div class="d-flex align-center justify-space-around mt-6" style="width: 90%">
                <div style="width: 23%" class="d-flex justify-end">
                  <label>Time Filter</label>
                </div>
                <div style="width: 70%" class="d-flex justify-end">
                  <v-btn class="btn-global" size="small" @click="fields++" :disabled="fields>=4||readOnly" :class="{'disabled-btn':readOnly}">+ Add New</v-btn>
                </div>
              </div>

              <div class="d-flex flex-column justify-center align-center mt-2" style="width: 90%">
                <div class="d-flex align-center justify-space-around mt-1" v-for="(field,i) in fields+1" :key="i"
                     style="width: 100%">
                  <div style="width: 23%" class="d-flex justify-end">
                    <v-btn v-if="fields>0" icon size="xx-small" elevation="0" @click="handleDelete(i)">
                      <v-icon size="x-small" color="red">mdi-delete</v-icon>
                    </v-btn>
                  </div>
                  <div style="width: 70%" class="d-flex justify-end">
                    <TextField type="text" placeholder="name" class="mb-1" style="height: 37px;width: 49%"
                               v-model="timeFilterName[i]" :readOnly="readOnly"/>
                    <v-spacer></v-spacer>
                    <TextField type="time" style="height: 37px;width: 49%" v-model="timeFilterTime[i]" :readOnly="readOnly"/>
                  </div>
                </div>
                <div class="d-flex justify-end mt-6" style="width: 100%">
                  <v-spacer></v-spacer>
                  <v-btn id="p1Sub" class="btn-global" size="small" color="green" type="submit">Next</v-btn>
                </div>
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </form>

      <form @submit="submitPanel2">
        <v-expansion-panel value="permission">
          <v-expansion-panel-title>
            Permission
            <template v-slot:actions="{expanded}">
              <v-icon size="x-large" :icon="expanded?'mdi-menu-up':'mdi-menu-down'"></v-icon>
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="d-flex flex-column justify-center align-center">
              <h4 class="align-self-start mt-4 mb-2">Privacy</h4>
              <div class="d-flex align-center" style="width: 80%">
                <div class="d-flex justify-start align-center" style="width: 50%">
                  <RadioButton v-model="publicRadio" value="0" :readOnly="readOnly"></RadioButton>
                  <label class="mr-4">Public</label>
                </div>
                <div class="d-flex justify-end align-center">
                  <RadioButton v-model="publicRadio" value="1" :readOnly="readOnly"></RadioButton>
                  <label class="mr-4">Private</label>
                </div>
              </div>

              <p v-if="errors2.publicRadio" class="error-message">{{ errors2.publicRadio }}</p>

              <h4 class="align-self-start mt-4 mb-2">Update</h4>
              <div class="d-flex align-center" style="width: 80%">
                <div class="d-flex justify-start align-center" style="width: 50%">
                  <RadioButton v-model="updateRadio" value="0" :error="errors2.updateRadio" :readOnly="readOnly"></RadioButton>
                  <label class="mr-4">Live Update</label>
                </div>
                <div class="d-flex justify-start align-center">
                  <RadioButton v-model="updateRadio" value="1" :readOnly="readOnly"></RadioButton>
                  <label class="mr-4">Admin Approval</label>
                </div>
              </div>

              <p v-if="errors2.updateRadio" class="error-message">{{ errors2.updateRadio }}</p>

            </div>

            <div class="d-flex align-center justify-end mt-6" style="width: 90%">
              <v-btn class="ml-2 btn-global" size="small" @click="panel='general'">Back</v-btn>
              <v-btn id="p2Sub" class="ml-2 btn-global" size="small" color="green" type="submit">Next</v-btn>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </form>

      <form @submit.prevent="submitPanel3">
        <v-expansion-panel value="cameras">
          <v-expansion-panel-title>
            Register Cameras
            <template v-slot:actions="{expanded}">
              <v-icon size="x-large" :icon="expanded?'mdi-menu-up':'mdi-menu-down'"></v-icon>
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div>
              <div class="d-flex align-self-start" style="width: 100%">
                <v-spacer></v-spacer>
                <TabButton text="Manually" :selected="manually" @click="handleClickManual"/>
                <TabButton text="QR Code" :selected="qr" @click="handleClickQR"/>
              </div>
              <v-card rounded class="bg-grey-lighten-3" height="30vh">
                <Manually v-if="manually"/>
                <QR v-if="qr" @device="handleDevice"/>
              </v-card>
              <div style="width: 100%" class="d-flex align-end justify-space-between mt-4">
                <v-btn class="btn-global" size="small" @click="userModal=true">Invite People</v-btn>
                <v-btn class="btn-global" size="small" :disabled="camObj._id===undefined" @click="handleAddCamera">Add Camera</v-btn>
              </div>
              <div style="width: 100%" class="d-flex align-center justify-center mt-4">
                <p v-if="p3Error" class="error-message" style="font-size: 17px">{{ p3Error }}</p>
              </div>

              <div class="mt-4 d-flex flex-column align-center justify-center" v-if="cams.length>0">
                <span class="align-self-center" style="font-size: 1.5rem">Selected Cameras</span>
                <div class="align-self-center mb-2" style="width: 100%" v-for="(device,i) in cams" :key="i">
                  <Devices :device="device" style="width: 100%"/>
                </div>
              </div>

              <div class="d-flex align-center justify-end mt-10">
                <v-btn class="ml-2 btn-global" size="small" @click="panel='permission'">Back</v-btn>
                <v-btn class="ml-2 btn-global" color="green" size="small" type="submit" :class="{'disabled-btn':readOnly}">Submit</v-btn>
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </form>
    </v-expansion-panels>


    <v-overlay v-model="userModal" class="d-flex justify-center align-center">
      <v-card class="d-flex flex-column align-center pa-5" min-width="40vw" height="50vh">
        <v-card-title>Search Users</v-card-title>
        <div style="height: 100%"></div>
        <div class="d-flex justify-end" style="width: 100%">
          <v-btn @click="userModal=false" class="btn-global mr-4" size="small">Close</v-btn>
          <v-btn @click="userModal=false" class="btn-global" color="green" size="small">Submit</v-btn>
        </div>
      </v-card>
    </v-overlay>

  </div>
</template>

<script>
import TextField from "../components/TextField";
import {ref} from "vue";
import RadioButton from "../components/RadioButton";
import TabButton from "../components/TabButton";
import AddCamera from "./AddCamera";
import Manually from "../components/Manually";
import QR from "../components/QR";
import {useForm,useField} from "vee-validate";
import {required} from "../utils/validators";
import {GalleryService} from "../services/galleryService";
import moment from "moment";
import {useRoute} from "vue-router";
import Devices from "../components/Devices";
import router from "../router";

export default {
  name: "SharedGalleryCreate",
  components: {Devices, QR, Manually, AddCamera, RadioButton, TextField, TabButton},
  async setup(){
    const panel=ref('general')
    const fields=ref(0)
    const timeFilterName=ref([])
    const timeFilterTime=ref([])
    const manually=ref(true)
    const qr=ref(false)
    const p3Error=ref('')
    const service=new GalleryService()
    const route=useRoute()
    const readOnly=ref(false)
    const camObj=ref({})
    const cams=ref([])
    const userModal=ref(false)

    let res

    const schema1={
      name:required,
      date:required,
      time:required,
      // name:undefined,
      // date:undefined,
      // time:undefined,
    }
    const {handleSubmit:submit1,errors:errors1}=useForm({
      validationSchema:schema1
    })
    const {value:name}=useField('name')
    const {value:date}=useField('date')
    const {value:time}=useField('time')


    const schema2={
      publicRadio:required,
      updateRadio:required
    }
    const {handleSubmit:submit2,errors:errors2}=useForm({
      validationSchema:schema2
    })
    const {value:publicRadio='0'}=useField('publicRadio')
    const {value:updateRadio='0'}=useField('updateRadio')


    if(route.params.id){
      res=await service.get(route.params.id)
      console.log(res)
      name.value=res.event_name
      date.value=moment(res.date).format('YYYY-MM-DD')
      console.log(date.value)
      time.value=res.time
      publicRadio.value=res.public?'0':'1'
      updateRadio.value=res.live_update?'0':'1'
      fields.value=res.time_filter.length-1
      cams.value=[...res.cams]
      readOnly.value=true
    }


    function handleClickManual(){
      manually.value=true
      qr.value=false
    }

    function handleClickQR(){
      manually.value=false
      qr.value=true
    }

    function handleDelete(i){
      console.log(timeFilterTime.value)
      console.log(timeFilterName.value)
      fields.value--
      timeFilterTime.value.splice(i,1)
      timeFilterName.value.splice(i,1)
    }

    function handleDevice(e){
      console.log(e)
      camObj.value=e
    }

    function handleAddCamera(){
      if(cams.value.filter(n=>n._id===camObj.value._id).length<=0) cams.value.push(camObj.value)
      camObj.value={}
      manually.value=true
      qr.value=false
    }

    const submitPanel1=submit1(values => {
      console.log(values)
      panel.value='permission'
    })

    const submitPanel2=submit2(values => {
      console.log(values)
      panel.value='cameras'
    })

    async function submitPanel3(){
      p3Error.value=''
      p3Error.value=name.value&&date.value&&time.value&&publicRadio.value&&updateRadio.value?'':'Error in previous fields'

      if(p3Error.value.length>0)return
      date.value=moment(date.value)._i
      console.log(date.value)
      const obj={
        owner_id: "620b48172e81c7e598577483",
        event_name: name.value,
        date: date.value,
        public: publicRadio.value==="0",
        live_update: updateRadio.value==="0",
        time:time.value,
        cams: cams.value.map(n=>n._id),
        time_filter: [
        ],
        guest: [
        ]
      }
      // console.log(obj)
      let response
      if(route.params.id){
        response=await service.patch(res._id,obj)
        console.log(response)
      }
      else {
        response=await service.create(obj)
        console.log(response)
      }
      if(response._id){
        await router.push('/galleries')
      }
    }

    return{
      name,
      date,
      time,
      panel,
      fields,
      timeFilterTime,
      timeFilterName,
      publicRadio,
      updateRadio,
      manually,
      qr,
      handleDelete,
      handleClickManual,
      handleClickQR,
      handleDevice,
      submitPanel1,
      submitPanel2,
      submitPanel3,
      errors1,
      errors2,
      p3Error,
      res,
      readOnly,
      cams,
      camObj,
      handleAddCamera,
      userModal
    }

  }
}
</script>

<style scoped>
.error-message{
  text-align: start;
  color: red;
  font-size: 80%;
}
.title{
  font-size: 2.5rem;
  font-family: Century;
  font-weight: bold;
  margin-top: 5%;
  margin-bottom: 5%;
}

.v-expansion-panels{
  display: block;
}

.disabled-btn{
  color: white;
  background: grey;
}
</style>
