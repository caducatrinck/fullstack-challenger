import { mount, flushPromises } from '@vue/test-utils';
import RegisterForm from '@/components/RegisterForm.vue'; // Atualize o caminho para o seu componente
import { useToast } from 'vue-toast-notification';
import UserService from '@/services/UserService';
import { useRouter } from 'vue-router';

// Mock the useToast and useRouter hooks
jest.mock('vue-toast-notification');
jest.mock('vue-router', () => ({
  useRouter: jest.fn()
}));

// Mock UserService
jest.mock('@/services/UserService', () => ({
  create: jest.fn()
}));

describe('RegisterForm', () => {
  let wrapper: any;
  let toastMock: any;
  let routerMock: any;

  beforeEach(() => {
    // Mock the useToast hook
    toastMock = {
      success: jest.fn(),
      error: jest.fn()
    };
    useToast.mockReturnValue(toastMock);

    // Mock the useRouter hook
    routerMock = {
      push: jest.fn()
    };
    useRouter.mockReturnValue(routerMock);

    wrapper = mount(RegisterForm);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('displays validation errors', async () => {
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(wrapper.find('.text-red-500').exists()).toBe(true);
  });

  it('submits the form successfully', async () => {
    UserService.create.mockResolvedValue({ message: 'Usuário criado' });

    await wrapper.find('#username').setValue('validusername');
    await wrapper.find('#password').setValue('validpassword');
    await wrapper.find('#confirmPassword').setValue('validpassword');

    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(UserService.create).toHaveBeenCalledWith({
      username: 'validusername',
      password: 'validpassword'
    });
    expect(toastMock.success).toHaveBeenCalledWith('Usuário criado');
    expect(routerMock.push).toHaveBeenCalledWith('/login');
  });

  it('displays an error message when submission fails', async () => {
    const errorMessage = 'Falha ao criar usuário';
    UserService.create.mockRejectedValue({ message: errorMessage });

    await wrapper.find('#username').setValue('validusername');
    await wrapper.find('#password').setValue('validpassword');
    await wrapper.find('#confirmPassword').setValue('validpassword');

    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(toastMock.error).toHaveBeenCalledWith(errorMessage);
  });
});
