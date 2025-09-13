/*
 * MIT License
 *
 * Copyright (c) 2025 machinateur
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// The desktop route is a child route of the tabs (root) tabs route, when children get assigned to all `root` core routes.
//  The children are collected by a route middleware and referenced in the (module) route definition.
let desktopChildren = [];
const desktopRoute = {
    path:'desktop',
    name: 'desktop',
    component: 'sw-desktop',
    //redirect: '/sw/dashboard/index',
    children: desktopChildren,
};

let tabsRoute = {
    path: '/sw/dashboard/tabs',
    name: 'tabs',
    coreRoute: true,
    //root: true,
    component: 'sw-desktop-tabs',
    // will be replaced in router (root)
    children: {
        desktop: desktopRoute,
    },
};


Shopware.Module.register('sat-plugin', {
    name: 'sat-plugin',
    type: 'core',

    color: '#ff3d58',
    icon: 'default-shopping-paper-bag-product',

    title: 'Superior Admin Tabs Plugin',
    description: 'Add tabs to the Shopware 6 administration.',

    routes: {
        tabs: tabsRoute,

        desktop: desktopRoute,
    },

    routeMiddleware(next, currentRoute) {
        if ('sat.plugin.tabs' !== currentRoute
            || 'sat.plugin.desktop' !== currentRoute
        ) {
            (function () {
                const initContainer = Shopware.Application.getContainer('init');

                initContainer.router.addRoutes([tabsRoute]);
            }());

            return;
        }

        // Collect all routes.
        desktopChildren.push(currentRoute);
    }
});

//Shopware.Service().addDecorator()

import './app/component/sw-desktop';
import './app/component/sw-desktop-tabs';
