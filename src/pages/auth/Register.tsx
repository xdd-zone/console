import { Button, Divider, Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { AiFillWechat, AiOutlineGoogle } from 'react-icons/ai'

import { AuthContainer } from '@/components/business'

interface RegisterFormData {
  confirmPassword: string
  email: string
  nickname: string
  password: string
  username: string
}

/**
 * 注册页
 */
export function Register() {
  const { t } = useTranslation()
  const [form] = Form.useForm<RegisterFormData>()

  return (
    <AuthContainer>
      {/* 标题 */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{t('auth.registerTitle')}</h1>
        <p className="text-gray-600 dark:text-gray-300">{t('auth.createAccount')}</p>
      </div>

      {/* 注册表单 */}
      <Form form={form} name="register" layout="vertical" size="large" className="space-y-4">
        <Form.Item
          label={t('auth.username')}
          name="username"
          rules={[{ message: t('auth.usernameRequired'), required: true }]}
        >
          <Input placeholder={t('auth.usernamePlaceholder')} className="rounded-lg" />
        </Form.Item>

        <Form.Item
          label={t('auth.nickname')}
          name="nickname"
          rules={[{ message: t('auth.nicknameRequired'), required: true }]}
        >
          <Input placeholder={t('auth.nicknamePlaceholder')} className="rounded-lg" />
        </Form.Item>

        <Form.Item
          label={t('auth.email')}
          name="email"
          rules={[
            { message: t('auth.emailRequired'), required: true },
            { message: t('auth.emailInvalid'), type: 'email' },
          ]}
        >
          <Input placeholder={t('auth.emailPlaceholder')} className="rounded-lg" />
        </Form.Item>

        <Form.Item
          label={t('auth.password')}
          name="password"
          rules={[
            { message: t('auth.passwordRequired'), required: true },
            { message: t('auth.passwordMinLength'), min: 8 },
          ]}
        >
          <Input.Password placeholder={t('auth.passwordPlaceholder')} className="rounded-lg" />
        </Form.Item>

        <Form.Item
          label={t('auth.confirmPassword')}
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { message: t('auth.confirmPasswordRequired'), required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(t('auth.passwordMismatch')))
              },
            }),
          ]}
        >
          <Input.Password placeholder={t('auth.confirmPasswordPlaceholder')} className="rounded-lg" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="h-12 w-full rounded-lg font-medium">
            {t('auth.register')}
          </Button>
        </Form.Item>
      </Form>

      {/* 分割线 */}
      <Divider className="my-6">
        <span className="text-sm text-gray-500 dark:text-gray-400">{t('auth.orSocialRegister')}</span>
      </Divider>

      {/* 社交登录按钮 */}
      <div className="flex gap-4">
        <Button
          icon={<AiFillWechat />}
          className="h-12 flex-1 rounded-lg border-gray-300 transition-colors hover:border-green-500 hover:text-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:border-green-400 dark:hover:text-green-400"
        >
          {t('auth.wechatRegister')}
        </Button>
        <Button
          icon={<AiOutlineGoogle />}
          className="h-12 flex-1 rounded-lg border-gray-300 transition-colors hover:border-red-500 hover:text-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:border-red-400 dark:hover:text-red-400"
        >
          {t('auth.googleRegister')}
        </Button>
      </div>

      {/* 登录链接 */}
      <div className="mt-6 text-center">
        <span className="text-sm text-gray-600 dark:text-gray-300">{t('auth.haveAccount')}</span>
        <a
          href="#"
          className="ml-1 text-sm text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {t('auth.loginNow')}
        </a>
      </div>
    </AuthContainer>
  )
}
