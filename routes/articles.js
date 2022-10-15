const expres = require("express");
const article = require("./../models/article");

const Article = require("./../models/article");

const router = expres.Router();


router.get("/", async (req, res) => {
  const article = await Article.find();
  res.render("articles/index", { articles: article });
});

router.get("/new", (req, res) => {
  res.render("articles/new", { articles: new Article() });
});

router.get("/edit/:slug",async (req,res)=>{
  const article = await Article.find({slug: req.params.slug});
  console.log(article)
 res.render('articles/edit',{articles: article[0]})
})

router.post("/", async (req, res,next) => {
 req.article = new Article();
 next();
},saveAndRedirect('new'));

router.put('/:id',async (req,res,next)=>{
  req.article = await Article.findById(req.params.id);
  next();
},saveAndRedirect('edit'));

router.get("/:slug", async (req, res) => {
  const article = await Article.find({slug: req.params.slug});
  if(article === null) res.redirect('/');
  // console.log(article);
   res.render("articles/show",{ articles: article[0]} );
});

router.delete('/:id',async (req,res)=>{
await Article.findByIdAndDelete(req.params.id);
res.redirect('/articles')
});

function saveAndRedirect(path){
return async (req,res)=>{
  let article = req.article;
    article.title=req.body.title;
   article.description=req.body.description
  article.markdown=req.body.markdown
  try {
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (e) {
    console.log(e);
    res.render(`articles/${path}`, { articles: article });
  }
}
 
}

module.exports = router;
