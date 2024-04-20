import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import {createPostInput,updatePostInput} from "@kalpitb/medium-common-new";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables:{
    userId:string
  }

}>({strict:false})

blogRouter.use(async (c, next) => {
  
  const authHeader = c.req.header("Authorization") || ""
  console.log(authHeader,"authHeader")
  try{
    console.log(authHeader)
    // const token = authHeader.split(' ')[1];
  const user = await verify(authHeader.split(' ')[1], c.env.JWT_SECRET)
  console.log("user",user)
  if(user){
    // console.log("Inside if")
    c.set("userId",user.id);
    await next();
  }else{
    c.status(403);
    return(c.json({
      message:"You are not logged in"
    }))
  }
}catch(e){
  console.log("Inside catch")
c.status(403);
return c.json({
  message:"You are logged in"
})
}
})
blogRouter.post('/', async (c) => {
  const body = await c.req.json()
  const {success}=createPostInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs not correct"
      })
    }
  const authorId=c.get("userId")
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    //  await prisma.$transaction([prisma.user.create({
    //   data:{
    //       email:body.email,
    //       password:body.password,
    //       name:body.name
    //   }
    // })])
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(authorId)
      }
    })
    return c.json(
      {
        id: blog.id
      }
    )
  } catch (e) {
    console.log("e", e)
    return c.text("Invalid");
  }
})
blogRouter.put('/', async (c) => {
  const body = await c.req.json()
  const {success}=updatePostInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs not correct"
      })
    }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())
  //  await prisma.$transaction([prisma.user.create({
  //   data:{
  //       email:body.email,
  //       password:body.password,
  //       name:body.name
  //   }
  // })])
  try{
  const blog = await prisma.blog.update({
    where: {
      id: body.id
    },
    data: {
      title: body.title,
      content: body.content
    }
  })
  return c.json(
    {
      id: blog.id
    }
  )
  }catch(e){
    c.status(411);
    return c.json({
      message: "Error while editing blog"
    })
  }
})
blogRouter.get('particular/:id', async (c) => {
  console.log("Inside diffrenr router")
  const id = c.req.param("id")
  console.log("id",id)
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())
  //  await prisma.$transaction([prisma.user.create({
  //   data:{
  //       email:body.email,
  //       password:body.password,
  //       name:body.name
  //   }
  // })])
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id)
      },
      select:{
        id:true,
        title: true,
        content: true,
        author:{
          select:{
            name:true,
            email:true
          }
        }
      }
    })
    return c.json(
      {
        blog:blog
      }
    )
  } catch (e) {
    c.status(411);
    return c.json({
      message: "Error while fetching blog post"
    })
  }
})
//pagination
blogRouter.get('/bulk', async (c) => {
  console.log("Insid eblik")
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())
  const blogs = await prisma.blog.findMany(({
    select:{
      content:true,
      title:true,
      id:true,
      author:{
        select:{
          name :true,
          email:true
        }
      }
    }
  }));
  console.log("blogs",blogs)
  return c.json({blogs:blogs});
})