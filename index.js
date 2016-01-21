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

/**
 * Given the observable of values (of the query filter text input),
 * return the state$, which consists of both the query itself and
 * the list of entries that satisfy the query.
 */
function model(value$) {
  return value$.map(query => ({
    query,
    entries : indexEntries.filter(entry => (entry.name.indexOf(query) !== -1))
  }));
}

/**
 * Render the given array of indexEntries as a table.
 */
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

/**
 * Given the state$ observable (again, consisting of the query and the index
 * entries satisfying the query), return the virtual DOM representation of
 * the corresponding page.
 */
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
