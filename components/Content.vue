<template>
  <Head>
    <Meta name="description" content="My app description" />
  </Head>
  <div class="m-5 flex-grow-1 content-container">
    <h4 class="text-dark-blue">Update Patient Medical Record</h4>
    <span>Click the tabs to view and edit patient medical details</span>

    <div
      class="records-container d-flex justify-content-center flex-column align-items-center mt-5"
    >
      <form class="content p-5" @submit.prevent="addRecord()">
        <!-- Records  -->
        <div
          class="d-flex flex-column"
          v-for="investigations in investigation_types"
          :key="investigations.id"
        >
          <h2>{{ investigations.title }}</h2>
          <div class="records">
            <div
              class="record"
              v-for="investigation in investigations.investigations"
              :key="investigation.id"
            >
              <input
                type="checkbox"
                :value="investigation.id"
                v-model="investigations_check"
              />
              <span>{{ investigation.title }}</span>
            </div>
          </div>
        </div>

        <div class="form">
          <div class="row">
            <div class="form-group">
              <label for="ct-scan">CT Scan</label>
              <input
                type="text"
                class="form-control"
                placeholder="*Specify"
                v-model="ctscan"
              />
            </div>

            <div class="form-group">
              <label for="ct-scan">MRI</label>
              <input
                type="text"
                class="form-control"
                placeholder="MRI"
                v-model="mri"
              />
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button class="btn btn-primary">Save and Send</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const { $toast } = useNuxtApp();

// login to retrieve the token
const investigation_types = ref([]);

const investigations_check = ref([]);
const ctscan = ref("");
const mri = ref("");

const { onLogin, getToken } = useApollo();

async function getLoginToken() {
  const loginQuery = gql`
    mutation {
      login(email: "tester@kompletecare.com", password: "password")
    }
  `;

  const { mutate: LoginUser } = useMutation(loginQuery);
  const token = await LoginUser().then((res) => {
    return res.data.login;
  });

  onLogin(token);
}

// get records
async function getAllRecords() {
  const getRecordsQuery = gql`
    query {
      investigation_types {
        id
        title
        investigations {
          title
          id
        }
      }
    }
  `;

  const { data } = await useAsyncQuery(getRecordsQuery);
  const records = data.value;

  const investigations = records.investigation_types;

  investigation_types.value = investigations;

  // console.log($alert);
}
// add record
async function addRecord() {
  // validation
  if (
    investigations_check.value.length > 0 &&
    ctscan.value.trim().length > 0 &&
    mri.value.trim().length > 0
  ) {
    const query = gql`
      mutation Add_medical_record(
        $investigations: [ID!]!
        $ctscan: String!
        $mri: String!
        $developer: String!
      ) {
        add_medical_record(
          investigations: $investigations
          ctscan: $ctscan
          mri: $mri
          developer: $developer
        ) {
          id
          patient {
            id
            name
            email
          }
          investigations {
            id
            title
            type {
              id
              title
            }
          }
          ctscan
          mri
          created_at
        }
      }
    `;

    const variables = {
      investigations: investigations_check.value,
      mri: mri.value,
      ctscan: ctscan.value,
      developer: "Aka'aba Musa Akidi",
    };

    const { mutate: addRecordQuery } = useMutation(query, { variables });

    await addRecordQuery().then((res) => {
      if (res) {
        $toast.success("Record submitted successfully!", {
          position: "top-right",
        });
      }
    });
  } else {
    $toast.error("All fields required", {
      position: "top-right",
    });
  }
}

onMounted(async () => {
  if (!getToken()) {
    getLoginToken();
  }
  getAllRecords();
});
</script>

<style></style>
