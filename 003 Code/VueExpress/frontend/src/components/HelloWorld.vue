<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Capstone project</h3>
    <ul>
      <li><a href="https://github.com/HBNU-SWUNIV/come-capstone23-ksg" target="_blank" rel="noopener">KSG Team Git hub</a></li>
    </ul>
    <h3>Staff</h3>
    <ul>
      <li>강장운</li>
      <li>김정훈</li>
      <li>석수용</li>
      

    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
