'use server'

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function signupAction(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');

  if (!name || !email || !password) {
    return { error: '모든 필드를 입력해주세요.' };
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: '이미 사용중인 이메일입니다.' };
    }

    await prisma.user.create({
      data: { name, email, password }
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: '회원가입 중 오류가 발생했습니다.' };
  }
}

export async function loginAction(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return { error: '이메일과 비밀번호를 입력해주세요.' };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || user.password !== password) {
      return { error: '이메일 또는 비밀번호가 일치하지 않습니다.' };
    }

    cookies().set('userId', user.id.toString(), { httpOnly: true, path: '/' });
    
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: '로그인 중 오류가 발생했습니다.' };
  }
}

export async function logoutAction() {
  cookies().delete('userId');
}

export async function getUserAction() {
  const userId = cookies().get('userId')?.value;
  if (!userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: { id: true, name: true, email: true }
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
