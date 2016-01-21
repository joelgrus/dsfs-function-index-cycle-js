# Function Index

A reimplementation of the <a href = "https://github.com/joelgrus/dsfs-function-index">Data Science from Scratch function index</a> except in <a href = "http://cycle.js.org/">cycle.js</a>.

I wrote a blog post about it:

<a href = "http://joelgrus.com/2016/01/21/creating-a-function-index-using-cyclejs/">http://joelgrus.com/2016/01/21/creating-a-function-index-using-cyclejs/</a>

* `index.js` : this is where almost all of the interesting code lives
* `functions.js` : just the raw data that makes up the index
* `index.html` : the HTML / CSS for the page
* `function-index.js` : the output of browserify / uglify

If you want to build this yourself you would

```bash
npm install
npm run-script build
```

and then just run a web server and look at `index.html`.
