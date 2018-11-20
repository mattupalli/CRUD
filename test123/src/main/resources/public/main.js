const app = new Vue({
    el: "#app",
    data: {
      editUser: null,
      users: [],
    },
    methods: {

      deleteUser(id, i) {
        fetch("http://localhost:7000/users/" + id, {
          method: "DELETE"
        })
        .then(() => {
          this.users.splice(i, 1);
        })
      },
      updateUser(user) {
        fetch("http://localhost:7000/users/" + user.id, {
          body: JSON.stringify(user),
          method: "PATCH",
        })
        .then(() => {
          this.editUser = null;
        })
      }
    },

    mounted() {
      fetch("http://localhost:7000/users")
        .then(response => response.json())
        .then((data) => {
          this.users = data;
        })
    },
    template: `
    <div>
      <li v-for="user, i in users">
        <div v-if="editUser === user.id">
          <v-text-field label="Name" v-on:keyup.10="updateUser(user)" v-model="user.name"/>
          <v-text-field label="Email" v-on:keyup.10="updateUser(user)" v-model="user.email" />
          <v-btn v-on:click="updateUser(user)" color="green" size="small">Update</v-btn>
        </div>
          <v-btn v-on:click="editUser= user.id" outline small fab color="blue">
                <v-icon>edit</v-icon>
              </v-btn>

          <v-btn v-on:click="deleteUser(user.id, i)" color="orange" size="small">Delete</v-btn>


            <tr class="text-xs-right">Name:  {{ user.name }}</tr>
            <br>
            <tr class="text-xs-right">Email:  {{ user.email }}</tr>
            <br>
            <tr class="text-xs-right">id:  {{ user.id }}</tr>
            <hr>




        </div>

      </li>

    </div>
    `,
});