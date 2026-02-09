import { Button, Divider, Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { AiFillWechat, AiOutlineGoogle } from 'react-icons/ai'

import { AuthContainer } from '@/components/business'

/**
 * 登录页
 */
export function Login() {
  const { t } = useTranslation()

  return (
    <AuthContainer>
      {/* 标题 */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold text-[var(--catppuccin-text-primary)]">{t('auth.loginTitle')}</h1>
        <p className="text-[var(--catppuccin-text-secondary)]">{t('auth.loginWelcome')}</p>
      </div>

      {/* 登录表单 */}
      <Form name="login" layout="vertical" size="large" className="space-y-4">
        <Form.Item
          label={t('auth.username')}
          name="username"
          rules={[{ message: t('auth.usernameRequired'), required: true }]}
        >
          <Input placeholder={t('auth.usernamePlaceholder')} className="rounded-lg" autoComplete="username" />
        </Form.Item>

        <Form.Item
          label={t('auth.password')}
          name="password"
          rules={[{ message: t('auth.passwordRequired'), required: true }]}
        >
          <Input.Password
            placeholder={t('auth.passwordPlaceholder')}
            className="rounded-lg"
            autoComplete="current-password"
          />
        </Form.Item>

        <div className="mb-4 flex justify-end">
          <a
            href="#"
            className="text-sm text-[var(--catppuccin-primary)] transition-colors hover:text-[var(--catppuccin-primary-hover)]"
          >
            {t('auth.forgotPassword')}
          </a>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="h-12 w-full rounded-lg font-medium">
            {t('auth.login')}
          </Button>
        </Form.Item>
      </Form>

      {/* 分割线 */}
      <Divider className="my-6">
        <span className="text-sm text-[var(--catppuccin-text-muted)]">{t('auth.orSocialLogin')}</span>
      </Divider>

      {/* 社交登录按钮 */}
      <div className="flex gap-4">
        <Button
          icon={<AiFillWechat />}
          className="h-12 flex-1 rounded-lg border-[var(--catppuccin-border)] bg-transparent text-[var(--catppuccin-text-secondary)] transition-colors hover:border-[#22c55e] hover:text-[#22c55e]"
        >
          {t('auth.wechatLogin')}
        </Button>
        <Button
          icon={<AiOutlineGoogle />}
          className="h-12 flex-1 rounded-lg border-[var(--catppuccin-border)] bg-transparent text-[var(--catppuccin-text-secondary)] transition-colors hover:border-[#ef4444] hover:text-[#ef4444]"
        >
          {t('auth.googleLogin')}
        </Button>
      </div>

      {/* 注册链接 */}
      <div className="mt-6 text-center">
        <span className="text-sm text-[var(--catppuccin-text-secondary)]">{t('auth.noAccount')}</span>
        <a
          href="#"
          className="ml-1 text-sm text-[var(--catppuccin-primary)] transition-colors hover:text-[var(--catppuccin-primary-hover)]"
        >
          {t('auth.registerNow')}
        </a>
      </div>
    </AuthContainer>
  )
}
