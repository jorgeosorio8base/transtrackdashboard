
        import {Button, Divider, Input} from '@nextui-org/react';
        import {useState} from 'react';
        import {useFormikContext} from 'formik';
        import { SignupFormProps } from '.';
        import { Icon } from '@iconify/react'
        import cn from 'classnames';
        import styles from './SignupPageComponent.module.scss';

        export interface SignupPageComponentProps {
            isLoading?: boolean;
        }

        export function SignupPageComponent({isLoading}: SignupPageComponentProps) {
                const [isVisible, setIsVisible] = useState(false);
                const toggleVisibility = () => setIsVisible(!isVisible);

                const { getFieldProps, touched, errors, handleSubmit } = useFormikContext<SignupFormProps>();

                return (
                    <main
                          className={styles['main']}
                          >
                          <div
                              className={cn(styles['leftPanel'], 'bg-primary')}
                          >
                              <div
                                  className={styles['leftPanelBackground']}
                              >
                                  <svg fill="none" height="720" viewBox="0 0 32 32" width="720">
                                  <path
                                      clipRule="evenodd"
                                      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                                      fill="#fff"
                                      fillRule="evenodd"
                                  />
                                  </svg>
                              </div>
                              <div
                              className={styles['leftPanelContent']}
                              >
                              <h2
                                  className="
                                      text-2xl
                                      font-light
                                      
                                  "
                              >
                                  WELCOME TO
                              </h2>
                              <h1
                                  className="
                                      text-4xl
                                      font-bold
                                      leading-[0]
                                  "
                              >
                                  TRANSTRACKDASHBOARD
                              </h1>
                              <Divider className="h-1 bg-white w-1/4" />
                              <p className="text-sm font-light">Login to access the dashboard</p>
                              </div>
                          </div>
  
                          <div
                              className={styles['rightPanel']}
                          >
                              <form className={styles['form']} onSubmit={handleSubmit}>
                                <svg fill="none" height="128" viewBox="0 0 32 32" width="128">
                                <path
                                clipRule="evenodd"
                                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                                fill="#000"
                                fillRule="evenodd"
                                />
                            </svg>
                            <Input 
                                fullWidth
                                size="lg"
                                variant="bordered"
                                type="text"
                                label="First Name"
                                className="text-black"
                                {...getFieldProps('firstName')}
                                errorMessage={touched.firstName && errors.firstName}
                                isInvalid={!!(touched.firstName && errors.firstName)}
                            />
                            <Input 
                                fullWidth
                                size="lg"
                                variant="bordered"
                                type="text"
                                label="Last Name"
                                className="text-black"
                                {...getFieldProps('lastName')}
                                errorMessage={touched.lastName && errors.lastName}
                                isInvalid={!!(touched.lastName && errors.lastName)}
                            />
                            <Input
                                fullWidth
                                size="lg"
                                variant="bordered"
                                type="email"
                                label="Email"
                                className="text-black"
                                {...getFieldProps('email')}
                                errorMessage={touched.email && errors.email}
                                isInvalid={!!(touched.email && errors.email)}
                            />
                            <Input
                                fullWidth
                                size="lg"
                                variant="bordered"
                                className="text-black"
                                label="Password"
                                {...getFieldProps('password')}
                                isInvalid={!!(touched.password && errors.password)}
                                errorMessage={touched.password && errors.password}
                                type={'password'}
                            />
                            <Input
                                fullWidth
                                size="lg"
                                variant="bordered"
                                className="text-black"
                                label="Confirm Password"
                                {...getFieldProps('confirmPassword')}
                                isInvalid={!!(touched.confirmPassword && errors.confirmPassword)}
                                errorMessage={touched.confirmPassword && errors.confirmPassword}
                                endContent={
                                <div
                                    className="
                                    w-6
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    h-full
                                    hover:scale-110
                                    transition-transform
                                "
                                    onClick={toggleVisibility}
                                >
                                    {isVisible ? <Icon icon="hugeicons:eye" /> : <Icon icon="hugeicons:eye" />}
                                </div>
                                }
                                type={isVisible ? 'text' : 'password'}
                            />
                            <div className="flex justify-end w-full">
                                <Button 
                                    isDisabled={
                                        !!(touched.email && errors.email) ||
                                        !!(touched.password && errors.password) ||
                                        !!(touched.firstName && errors.firstName) ||
                                        !!(touched.lastName && errors.lastName) ||
                                        !!(touched.confirmPassword && errors.confirmPassword)
                                    }
                                    type="submit" isLoading={isLoading || false} color="primary">
                                 Signup
                                </Button>
                            </div>

                            <p className="text-sm text-black font-light">
                                Already have an account?{' '}
                                <a href="#" className="text-primary font-light hover:underline">
                                Login
                                </a>
                            </p>
                              </form>
                          </div>
                          </main>
                )
        }
    