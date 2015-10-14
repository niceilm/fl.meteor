<h3>{{gridTitle}}</h3>
<div layout="row" layout-align="end center">
  <md-button ng-click="removeSelected($event)" ng-show="removeSelected">삭제</md-button>
</div>
<div>
  <span>총 {{totalCounts.count || 0}} 개</span>
</div>
<form ng-submit="permissionBulkUpsert()">
  <div style="height: 300px;overflow: auto">
    <md-input-container>
      <label>permission json</label>
      <textarea ng-model="json" ></textarea>
    </md-input-container>
  </div>
  <md-button type="submit">벌크업서트</md-button>
</form>
<md-button ng-click="permissionFindAll()">불러오기</md-button>
<form ng-submit="savePermission()" layout="row" ng-init="form.roles = []">
  <md-input-container>
    <label>state</label>
    <input ng-model="form.state">
  </md-input-container>
  <md-button type="submit">저장</md-button>
  <input type="hidden" ng-model="form.roles">
</form>
<div ui-grid="gridOptions" ui-grid-infinite-scroll ui-grid-selection ui-grid-resize-columns ui-grid-auto-resize flex></div>

<script type="text/ng-template" id="common-grid/remove-btn">
  <div class="ui-grid-cell-contents" title="삭제">
    <button ng-click="grid.appScope.remove(row.entity, $event)">삭제</button>
  </div>
</script>