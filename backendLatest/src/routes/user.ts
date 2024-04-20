import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import {signupInput,signinInput} from "@kalpitb/medium-common-new";

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET:string
    }
  }>()
userRouter.post('/signup', async (c) => {
    const body = await c.req.json()
  const {success}=signupInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message:"Inputs not correct"
    })
  }
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
      //  await prisma.$transaction([prisma.user.create({
      //   data:{
      //       email:body.email,
      //       password:body.password,
      //       name:body.name
      //   }
      // })])
      const user=await prisma.user.create({
        data:{
            email:body.email,
            password:body.password,
            name:body.name
        }
      })
      console.log("user",user)
      const token=await sign({
        id:user.id
      },c.env.JWT_SECRET)
      return c.json({jwt:token})
    }catch(e) {
      c.status(411);
      console.log("e",e)
    return c.json({error:"Unable to create"});
    }
  })
  userRouter.post('/signin',async (c) => {
    const body = await c.req.json()
    const {success}=signinInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs not correct"
      })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
      //  await prisma.$transaction([prisma.user.create({
      //   data:{
      //       email:body.email,
      //       password:body.password,
      //       name:body.name
      //   }
      // })])
      const user=await prisma.user.findFirst({
        where:{
            email:body.email,
            password:body.password,
        }
      })
      if(!user){
        c.status(403)//unauthorized
        return c.json({
          message:"Incorrect creds"
        });
      }
      const token=await sign({
        id:user.id
      },c.env.JWT_SECRET)
      return c.json({jwt:token})
    }catch(e) {
      console.log("e",e)
    return c.text("Invalid");
    }
  })