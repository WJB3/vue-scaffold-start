<template>
  <a-tabs v-model="activeKey" type="editable-card" @edit="onEdit" class="a_tab">
    <a-tab-pane tab="积分兑换列表" key="list" :closable="listClosable">
      <div class="wrap_table">
        <i-table
          :data="data"
          :pagination="pagination"
          :detail="detail"
          v-on:onEdit="handleEdit"
          v-on:onView="handleView"
          :loading="loading"
        ></i-table>

        <i-modal :visible="visible"></i-modal>

      </div>
    </a-tab-pane>
    <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable">
      <div v-html="pane.content"></div>
      <i-form
        v-if="pane.isForm"
        v-on:onAddSuccess="handleAddSuccess"
        v-on:onEditSuccess="handleEditSuccess"
        :current="current"
        :type="type"
      ></i-form>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import iTable from "./table";
import iForm from "./form";
import iModal from "./modal";
import { mapState,mapGetters } from "vuex";
export default {
  data() {
    return {
      activeKey: "list",
      panes: [],
      listClosable: false
    };
  },
  computed: mapState({
    data: state =>  [...state.credit.data],
    pagination: state => state.credit.pagination,
    type: state => state.order.type,
    current: state => state.credit.current,
    visible: state => state.credit.visible,
    loading: state => state.credit.loading,
    searchText: state => state.order.searchText,
    detail:state=>state.order.detail
  }),
  components: {
    iTable,
    iForm,
    iModal
  },
  watch:{
    detail:{
      handler(val){
        console.log(val)
      }
    }
  },
  mounted: function() {
    this.getList({});
  },
  methods: {
    getList: function(params) {
      this.$store.dispatch("credit/getList", {...params});
    },
    handleView: function(value) {
      this.$store.commit("credit/updateState", {
        type: "VIEW",
        current: value
      });
      const panes = this.panes;
      const activeKey = "newTabForm";
      panes.push({
        title: "查看品牌",
        content: "<div></div>",
        key: "newTabForm",
        isForm: true
      });
      this.panes = panes;
      this.activeKey = activeKey;
    },
    handleEdit: function(value) {
      this.$store.commit("credit/updateState", {
        type: "EDIT",
        current: value
      });
      const panes = this.panes;
      const activeKey = "newTabForm";
      panes.push({
        title: "编辑品牌",
        content: "<div></div>",
        key: "newTabForm",
        isForm: true
      });
      this.panes = panes;
      this.activeKey = activeKey;
    },
    handleAddBrand: function() {
      const panes = this.panes;
      const activeKey = "newTabForm";
      panes.push({
        title: "添加品牌",
        content: "<div></div>",
        key: "newTabForm",
        isForm: true
      });
      this.panes = panes;
      this.activeKey = activeKey;
    },
    onEdit(targetKey, action) {
      this[`${action}Tab`](targetKey);
    },
    addTab() {
      const panes = this.panes;
      const activeKey = `newTab${this.newTabIndex++}`;
      panes.push({
        title: "NEW Tab",
        content: "Content of new Tab",
        key: activeKey
      });
      this.panes = panes;
      this.activeKey = activeKey;
    },
    handleAddSuccess() {
      this.$message.success("添加品牌成功!");
      this.removeTab("newTabForm");
    },
    handleEditSuccess() {
      this.$message.success("编辑品牌成功!");
      this.removeTab("newTabForm");
    },
    removeTab(targetKey) {
      let activeKey = this.activeKey;
      let lastIndex;
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = this.panes.filter(pane => pane.key !== targetKey);
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activekey = panes[lastIndex].key;
        } else {
          activeKey = "list";
        }
      }
      if (panes.length === 0) {
        activeKey = "list";
      }
      this.$store.commit("order/updateState", {
        type: "ADD",
        current: {}
      });

      this.panes = panes;
      this.activeKey = activeKey;
    }
  }
};
</script>

<style lang="less" scoped>
.search_input {
  width: 200px;
  float: right;
}
.wrap_table {
  padding: 10px 50px;
}
.a_tab {
  background: white;
}
</style>