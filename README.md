Surveyr
==========

This is gutted version of surveyr - the experiment platform created for conducting modular customizable experiments. It is mostly just a template for creating express apps with angular. Logging in, signing up, and basic security features.

#Requirements

1. Install git if you don't have it.
2. Install mongoDB. Run it in the background. 
3. [Install node and npm][nodenpm](node's package manager) 
4. Server on which you can host nodejs (nginx to proxy requests).
5. Route requests from server to node.js (running by default on port 3000)

On OSX? Install mongoDB, node, npm, and yeoman using [homebrew][hbrew] 

[hbrew]:http://brew.sh/

###Setup 

First we need our task runner, dependency manager and scaffold generators (you don't need to know what they are)

```
npm install -g yo 
```

Then we need to get the template

```
git clone https://github.com/stevemacn/template
```  

We install it (bower needs --allow-root to be sudoed)

```
npm install
bower install
git submodule init
git submodule update
mongod & 
grunt
```    

If bower install doesn't work, try the following: 
```
git config --global url."https://".insteadOf git://
```


*Now we need to authenticate datasources and test these datasources are properly configured.*

[nodenpm]:http://www.joyent.com/blog/installing-node-and-npm
