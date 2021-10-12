/*
 * @Author: zhengqiang
 * @Date: 2021-03-26 15:31:36
 * @Desc: 菜单弹窗
 */

<template>
    <section class="menu-wrap">
        <sidebar-menu
            :menu="computedMenuData"
            :show-one-child="true"
            :relative="true"
            :hide-toggle="true"
            width="100%"
            @item-click="onItemClick">
            <span slot="dropdown-icon">
                <van-icon
                    class="arrow-up-down"
                    name="arrow-down" />
            </span>
        </sidebar-menu>
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { SidebarMenu } from 'vue-sidebar-menu'
import func from '@/utils/func'
import {
    enterpriseManage,
    ringPool
} from '@/constants/menu'

export default {
    name: 'MenuPopup',
    components: {
        SidebarMenu
    },
    data () {
        return {
            menuData: [
                ...enterpriseManage,
                ...ringPool
            ],
            computedMenuData: []
        }
    },
    computed: {
        ...mapState({
            menuTree: (state) => state.common.menuTree // 后台返回的菜单数据
        })
    },
    mounted () {
        if (!this.menuTree.length) {
            this.setMenuTree().then(() => {
                this.initMenu()
            })
        } else {
            this.initMenu()
        }
    },
    methods: {
        ...mapActions(['setMenuTree']),
        initMenu () {
            const user = func.userInfo()
            const routes = this.getComputedMenu(this.menuData, this.menuTree)
            // 获取权限管理菜单的位置
            const authMenuRoute = 'AuthorityMain'
            let authMenuPosition = ''
            routes.map((r, i) => {
                authMenuPosition = r.route === authMenuRoute ? i : authMenuPosition
            })
            // 如果所登陆的用户不可以创建角色，则去除权限菜单
            // 若有其他新增的菜单需要非后台控制，则从固定菜单的顺序从下向上进行判断删除
            if (!user.doCreate && this.menuData.some(v => v.route === authMenuRoute)) {
                routes.splice(authMenuPosition, 1)
            }
            this.computedMenuData = this.formatRoutes(routes)
        },
        getComputedMenu (menuData, menuTree) {
            const routesTree = menuData
            for (let i = menuData.length - 1; i >= 0; i--) {
                const routeNode = menuData[i]
                if (!this.parseDiff(routeNode.route, menuTree, null) && !routeNode.dontBelongMenuApi) {
                    routesTree.splice(i, 1)
                }
                if (routeNode.children && !routeNode.dontBelongMenuApi) {
                    this.getComputedMenu(routeNode.children, menuTree)
                }
            }
            return routesTree
        },
        parseDiff (routerName, tree, parent) {
            for (let i = 0; i < tree.length; i++) {
                const treeNode = tree[i]
                if (treeNode.menuName === routerName) {
                    return true
                } else if (treeNode.children && this.parseDiff(routerName, treeNode.children, treeNode)) {
                    return true
                }
            }
            return false
        },
        formatRoutes (routes) { // 将routes转换为UI组件需要的结构
            const result = []
            for (let i = 0; i < routes.length; i++) {
                const route = routes[i]
                const formatRoute = {
                    title: route.menuName,
                    icon: route.icon
                }
                const subRoutes = route.children
                if (!subRoutes) { // 无二级下拉菜单
                    formatRoute.href = route.index
                } else {
                    formatRoute.child = []
                    for (let j = 0; j < subRoutes.length; j++) {
                        formatRoute.child.push({
                            title: subRoutes[j].menuName,
                            href: subRoutes[j].index
                        })
                    }
                }
                result.push(formatRoute)
            }
            return result
        },
        onItemClick (event, item, node) {
            if (item.href) {
                this.$emit('update:showMenuPop', false)
            }
        }
    }
}
</script>
