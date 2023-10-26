<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Team KSG's Capstone Project</h3>
    <h6></h6>
    <h5>나쁜 것은 가리고, 좋은 것만 보여드립니다.</h5>
    <ul>
      <li><a href="https://github.com/HBNU-SWUNIV/come-capstone23-ksg" target="_blank" rel="noopener">Team KSG Github</a></li>
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
