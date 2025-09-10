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

import template from './sw-desktop.html.twig';
import './sw-desktop.scss';

Shopware.Component.override('sw-desktop', {
    template,

    computed: {
        enableAdminTabs()
        {
            // TODO: Make use of the plugin config option, to decide whether to show default behaviour.
            return true;
        },

        mainTab()
        {
            return {
                id: 'main',
                error: null,
                route: 'sat.plugin.tab',
            };
        },

        tabs()
        {
            return [];
        },
    },

    methods: {
        createdComponent()
        {
            this.$super('createdComponent');
        },

        checkRouteSettings()
        {
            this.$super('checkRouteSettings');

            this.noNavigation = this.noNavigation || this.enableAdminTabs;
        },
    },
});
