import { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;

  }
  
  export function Input({  children, ...rest }: ButtonProps) {
    return (
      <Input className={styles.button} {...rest} >
              {children}
      </Input>
    );
  }