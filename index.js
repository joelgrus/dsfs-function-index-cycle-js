import Rx from 'rx';
import Cycle from '@cycle/core';
import {div, input, p, table, thead, tbody, tr, th, td, makeDOMDriver} from '@cycle/dom';
import {indexEntries} from './functions'

/**
 * Given the DOM driver, return an observable with the value
 * of `input` after every `keyup` event.
 */
function intent(DOM) {
  return DOM.select('input').events('keyup')
    .map(ev => ev.target.value)
    .startWith('');
}

function matchesQuery(query) {
  return function(indexEntry) {
    return indexEntry.name.indexOf(query) !== -1;
  }
}

function model(value$) {
  return value$.map(q => ({
    query : q,
    entries : indexEntries.filter(matchesQuery(q))
  }));
}

function showEntries(indexEntries) {
  return table([
    thead([
      tr([
        th('chapter'),
        th('page'),
        th('function')
      ])
    ]),
    tbody(indexEntries.map(entry =>
      tr([
        td('' + entry.chapter),
        td('' + entry.page),
        td(entry.name)
      ])
    ))
  ]);
}

function view(state$) {
  return state$.map(state =>
    div([
      input({type: 'text',
             autofocus: true,
             placeholder: 'Search Query',
             value: state.query}),
      showEntries(state.entries)
    ]));
}

function main({DOM}) {
  return {DOM: view(model(intent(DOM)))};
}

Cycle.run(main, {
  DOM: makeDOMDriver('#app')
});
