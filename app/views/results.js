Balanced.ResultsFiltersHeaderView = Balanced.View.extend({
    templateName: 'results/results_filters_header',
    tagName: 'header',

    // UI computed properties
    transactionsTabSelected: function () {
        return this.get('controller.category') === "transaction";
    }.property('controller.category'),

    customersTabSelected: function () {
        return this.get('controller.category') === "account";
    }.property('controller.category'),

    fundingInstrumentsTabSelected: function () {
        return this.get('controller.category') === "funding_instrument";
    }.property('controller.category'),

    transaction_type_label: function () {
        var typesToLabels = {
            DEFAULT: 'Transactions'
        };
        var types = Balanced.SEARCH.TRANSACTION_TYPES;
        return this._getLabel(typesToLabels, types, this.get('controller.type'));
    }.property('controller.type'),

    funding_instrument_type_label: function () {
        var typesToLabels = {
            DEFAULT: 'Cards & Bank Accounts'
        };
        var types = Balanced.SEARCH.FUNDING_INSTRUMENT_TYPES;
        return this._getLabel(typesToLabels, types, this.get('controller.type'));
    }.property('controller.type'),

    totalTransactionsHeader: function () {
        return 'Transactions (' + this.get('searchResult.total_transactions') + ')';
    }.property('searchResult.total_transactions'),

    totalFundingInstrumentsHeader: function () {
        return 'Cards & Bank Accounts (' + this.get('searchResult.total_funding_instruments') + ')';
    }.property('searchResult.total_funding_instruments'),

    transaction_type_total: function () {
        var types = Balanced.SEARCH.TRANSACTION_TYPES;
        var type = this.get('controller.type');
        return (types.indexOf(type) >= 0 && this.get('searchResult.total_{0}s'.format(type))) || this.get('searchResult.total_transactions');
    }.property('controller.type', 'searchResult.total_transactions'),

    funding_instrument_type_total: function () {
        var types = Balanced.SEARCH.FUNDING_INSTRUMENT_TYPES;
        var type = this.get('controller.type');
        return (types.indexOf(type) >= 0 && this.get('searchResult.total_{0}s'.format(type))) || this.get('searchResult.total_funding_instruments');
    }.property('controller.type', 'searchResult'),

    _getLabel: function (labelMapping, acceptedTypes, type) {
        var label = labelMapping[type];
        if (!label && acceptedTypes.indexOf(type) > -1) {
            label = Balanced.Utils.toTitleCase(type.replace('_', ' ')) + 's';
        }
        return (label) ? label : labelMapping.DEFAULT;
    }
});

Balanced.TransactionsFiltersHeaderView = Balanced.View.extend({
    templateName: 'results/transactions_filters_header',
    tagName: 'header',

    allTabSelected: function () {
        return this.get('controller.type') === "transaction";
    }.property('controller.type'),

    holdsTabSelected: function () {
        return this.get('controller.type') === "hold";
    }.property('controller.type'),

    creditsTabSelected: function () {
        return this.get('controller.type') === "credit";
    }.property('controller.type'),

    debitsTabSelected: function () {
        return this.get('controller.type') === "debit";
    }.property('controller.type'),

    refundsTabSelected: function () {
        return this.get('controller.type') === "refund";
    }.property('controller.type'),

    debits_label: function () {
        if (this.get('controller.type') === 'debit') {
            return 'Debits: {0}'.format(Balanced.Utils.toTitleCase(this.get('controller.transactionType')));
        } else {
            return 'Debits: All';
        }
    }.property('controller.transactionType', 'controller.type'),

    credits_label: function () {
        if (this.get('controller.type') === 'credit') {
            return 'Credits: {0}'.format(Balanced.Utils.toTitleCase(this.get('controller.transactionType')));
        } else {
            return 'Credits: All';
        }
    }.property('controller.transactionType', 'controller.type')
});

Balanced.ResultsSortableColumnHeaderView = Balanced.View.extend({
    tagName: 'th',
    classNameBindings: 'sortClass',

    sortClass: function () {
        var sortField = this.get('controller.sortField');
        var sortOrder = this.get('controller.sortOrder');
        if (sortField !== this.get('field')) {
            return "unsorted";
        } else {
            switch (sortOrder) {
                case 'asc':
                    return 'ascending';
                case 'desc':
                    return 'descending';
                default:
                    return 'unsorted';
            }
        }
    }.property('controller.sortField', 'controller.sortOrder'),

    click: function (e) {
        var sortField = this.get('controller.sortField');
        var sortOrder = this.get('controller.sortOrder');
        var nextSortOrder = "asc";
        if (sortField === this.get('field')) {
            switch (sortOrder) {
                case 'asc':
                    nextSortOrder = 'desc';
                    break;
                case 'desc':
                    nextSortOrder = 'none';
                    break;
            }
        }
        this.get('controller').send('changeSortOrder', this.get('field'), nextSortOrder);
    }
});

Balanced.ResultsTableView = Balanced.View.extend({
    tagName: 'table',
    classNames: 'items'
});

Balanced.TransactionsResultsView = Balanced.ResultsTableView.extend({
    classNames: 'transactions',
    templateName: 'results/transactions_table'
});

Balanced.CustomersResultsView = Balanced.ResultsTableView.extend({
    classNames: 'accounts',
    templateName: 'results/customers_table'
});

Balanced.FundingInstrumentsResultsView = Balanced.ResultsTableView.extend({
    classNames: 'funding-instruments',
    templateName: 'results/funding_instruments_table'
});
