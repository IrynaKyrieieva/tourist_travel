import { Account } from './account';

export interface AccountSignUp extends Account {
    password: string;
    confirmPassword: string;
}
