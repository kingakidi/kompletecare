<template>
  <div class="d-flex" id="content">
    <Sidebar />
    <div class="d-flex flex-column flex-grow-1" id="main">
      <Topnav />
      <Content />
    </div>
  </div>
</template>

<style>
html,
body {
  height: 100%;
}

#__nuxt,
#content {
  width: 100%;
  height: 100%;
  background-color: #f5f5fb !important;
}

#main {
  overflow-x: hidden;
  overflow-y: visible;
}
</style>
