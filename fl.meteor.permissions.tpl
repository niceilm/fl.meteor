<div layout="row" layout-align="start center">
  <h3>{{gridTitle}}</h3>
  <span>총 {{totalCounts.count || 0}} 개</span>
  <span flex=""></span>
  <md-button ng-click="removeSelected($event)" ng-show="removeSelected">삭제</md-button>
</div>

</div>
<form ng-submit="savePermission()" layout="row">
  <md-input-container>
    <label>state name</label>
    <input ng-model="form.name">
  </md-input-container>
  <md-input-container>
    <label>mode</label>
    <input ng-model="form.mode">
  </md-input-container>
  <md-input-container>
    <label>roles</label>
    <input ng-model="form.roles">
  </md-input-container>
  <md-input-container>
    <label>replace state name</label>
    <input ng-model="form.replaceStateName">
  </md-input-container>
  <md-button type="submit">저장</md-button>
</form>
<div ui-grid="gridOptions" ui-grid-infinite-scroll ui-grid-selection ui-grid-resize-columns ui-grid-auto-resize flex></div>

<script type="text/ng-template" id="common-grid/remove-btn">
  <div class="ui-grid-cell-contents" title="삭제">
    <button ng-click="grid.appScope.remove(row.entity, $event)">삭제</button>
  </div>
</script>