#include    <18F4550.h>
#fuses      HSPLL,NOWDT,NOPBADEN,NOPROTECT,NOLVP,NODEBUG,USBDIV,PLL5,CPUDIV1,NOVREGEN,MCLR
#use        delay(crystal=20M)
#use        rs232(baud=9600, xmit=PIN_C6,rcv=PIN_C7,UART1,errors)
#define     LCD_RS          PIN_D1  
#define     LCD_ENABLE      PIN_D0
#define     LCD_DATA4       PIN_D2
#define     LCD_DATA5       PIN_D3
#define     LCD_DATA6       PIN_D4
#define     LCD_DATA7       PIN_D5
//#include    "RutinaLCD.h"
         /****EL JEVITO**** --> PROYECTO MICROS2-ROBÓTICA POWERED BY CARLOS GÓMEZ, WILFREDO ALCALÁ, ALLINGER MARTÍNEZ****/
/**********Declaración de bits***********/
#byte portb = 0xF81 //PORTB = 0xF81
#bit  rb7 = 0xF81.7 //PORTB = 0xF81
#bit  rb6 = 0xF81.6 //PORTB = 0xF81
#bit  rb5 = 0xF81.5 //PORTB = 0xF81
#bit  rb4 = 0xF81.4 //PORTB = 0xF81
#bit  rb3 = 0xF81.3 //PORTB = 0xF81
#bit  rb2 = 0xF81.2 //PORTB = 0xF81
#bit  rb1 = 0xF81.1 //PORTB = 0xF81
#bit  rb0 = 0xF81.0 //PORTB = 0xF81
/****************************************/
/**********Declaración de bits***********/
#byte portd = 0xF83 //PORTB = 0xF81
#bit  rd7 = 0xF83.7 //PORTB = 0xF81
#bit  rd6 = 0xF83.6 //PORTB = 0xF81
#bit  rd5 = 0xF83.5 //PORTB = 0xF81
#bit  rd4 = 0xF83.4 //PORTB = 0xF81
#bit  rd3 = 0xF83.3 //PORTB = 0xF81
#bit  rd2 = 0xF83.2 //PORTB = 0xF81
#bit  rd1 = 0xF83.1 //PORTB = 0xF81
#bit  rd0 = 0xF83.0 //PORTB = 0xF81

#bit  rc0 = 0xF82.0 //PORTC = 0xF82
/****************************************/

   /*********SUBRUTINAS***********/
   void uart_enviar(char dato); 
   void limpiar_rx();  
   void configurar();
   int readBitPortB(int bit);
   void setBitPortD(int bit);
   void LeerMatriz();
   void clearBitPortD(int8 bit);
   void setBitPortB(int bit);
   int8 Pow(int8 base, int8 exponente);
   int readBitPortD(int bit);
   void clearBitPortB(int8 bit);
   void EnviarTablero();
   void EnviarHola();
   /******************************/
   /*********VARIABLES PÚBLICAS***********/
   char  rx[20];
   int16 cont=0;
   
   int8 _tablero[] = {255,255,255,255,255,255,255,255};
/***************INTERRUPCIÓN DEL UART******************/
   #int_RDA 
   void uart_recibir (void)
   {
      clear_interrupt (int_rda);
      cont = 0;
      char  c=0;
      //If(caracter_recibido == inicioDeTrama) --> entrar al ciclo
      do
      {
         c = getc (); //Obtiene el primer caracter en el bus del UART
         if (c != '$' && c!=0)
         {
            rx[cont] = c;
            cont++;
         }
         if(cont>10) 
         {
            break;
         }
      }
      while (c != '$');    
     
   }
/********************************************************/

/***************RUTINA PRINCIPAL******************/
   void main()
   {
      /*****CONFIGURANDO***************/
      configurar();
      /*******************************/      
      
      rc0=1;
      delay_ms(1500);
      rc0=0;
      delay_ms(1500);
      while (true)
      {                
         LeerMatriz();         
         EnviarTablero();
         delay_ms(200);
      }
   }
/*********************************************************/
   
   /*********SUBRUTINAS***********/
   void configurar()
   {
      set_tris_d(255); //PORTD entrada
      set_tris_b(0); //PORTB SALIDA
      set_tris_c(0); //PORTC SALIDA
      setup_adc(ADC_OFF);
      //enable_interrupts(int_rda);
      portb=0;
      portd=0;
      rc0=0;
   }
      
  void LeerMatriz()
  {
      for(int8 d=0; d<8; d++) //Filas 
      {
         int8 exponente = 8;
         int8 resultado = 0;         
         int peso = 0;
         //
         //rdelay_ms(1);
         for(int8 b=0; b<8; b++) //Columnas
         {
            setBitPortB(b);
            exponente--;         
            delay_ms(5); 
            peso = Pow(2,exponente);
            resultado = resultado + readBitPortD(d)*peso;            
            clearBitPortB(b);
         }
         _tablero[d] = resultado;
         //        
         if(resultado>2) 
         {
            rc0 = 1;
         }         
      }
  }
  
  int8 Pow(int8 base, int8 exponente)
  {
      int8 result = 1;
      for(int8 i=0;i<exponente;i++)
      {
         result = result*base;
      }
      return result;
  }
  
  void clearBitPordtD(int8 bit)
  {
      switch (bit)
      {
         case 0:
            rd0 = 0;
            break;
         case 1:
            rd1 = 0;
            break;
         case 2:
            rd2 = 0;
            break;
         case 3:
            rd3 = 0;
            break;
         case 4:
            rd4 = 0;
            break;
         case 5:
            rd5 = 0;
            break;
         case 6:
            rd6 = 0;;
            break;
         case 7:
            rd7 = 0;
            break;            
      }
  }
   
  void clearBitPortB(int8 bit)
  {
      switch (bit)
      {
         case 0:
            rb0 = 0;
            break;
         case 1:
            rb1 = 0;
            break;
         case 2:
            rb2 = 0;
            break;
         case 3:
            rb3 = 0;
            break;
         case 4:
            rb4 = 0;
            break;
         case 5:
            rb5 = 0;
            break;
         case 6:
            rb6 = 0;;
            break;
         case 7:
            rb7 = 0;
            break;            
      }
  }
    
  int readBitPortB(int bit)
   {
      switch (bit)
      {
         case 0:
            return rb0;
            break;
         case 1:
            return rb1;
            break;
         case 2:
            return rb2;
            break;
         case 3:
            return rb3;
            break;
         case 4:
            return rb4;
            break;
         case 5:
            return rb5;
            break;
         case 6:
            return rb6;
            break;
         case 7:
            return rb7;
            break;            
      }
   }
  
  int readBitPortD(int bit)
   {
      switch (bit)
      {
         case 0:
            return rd0;
            break;
         case 1:
            return rd1;
            break;
         case 2:
            return rd2;
            break;
         case 3:
            return rd3;
            break;
         case 4:
            return rd4;
            break;
         case 5:
            return rd5;
            break;
         case 6:
            return rd6;
            break;
         case 7:
            return rd7;
            break;            
      }
   }
    
  void setBitPortD(int bit)
  {
  switch (bit)
      {
         case 0:
            rd0 = 1;
            break;
         case 1:
            rd1 = 1;
            break;
         case 2:
            rd2 = 1;
            break;
         case 3:
            rd3 = 1;
            break;
         case 4:
            rd4 = 1;
            break;
         case 5:
            rd5 = 1;
            break;
         case 6:
            rd6 = 1;;
            break;
         case 7:
            rd7 = 1;
            break;            
      }
  }
   
  void setBitPortB(int bit)
  {
      switch (bit)
      {
         case 0:
            rb0 = 1;
            break;
         case 1:
            rb1 = 1;
            break;
         case 2:
            rb2 = 1;
            break;
         case 3:
            rb3 = 1;
            break;
         case 4:
            rb4 = 1;
            break;
         case 5:
            rb5 = 1;
            break;
         case 6:
            rb6 = 1;;
            break;
         case 7:
            rb7 = 1;
            break;            
      }
  }
  
  void EnviarTablero() {
      uart_enviar('A');
      for(int i=0;i<8;i++)
      {
         uart_enviar(_tablero[i]);         
      }
      uart_enviar('$');
  }
  
  
  
   /************************///
   void uart_enviar (char dato)
   {
      putc (dato);
   }
   void limpiar_rx()
   {
      for (int i = 0; i < cont; i++)
      {
         rx[i] = 0;
      }
   }
   
   void EnviarHola() {
      
      uart_enviar('H');
      uart_enviar('o');
      uart_enviar('l');
      uart_enviar('a');
   }
