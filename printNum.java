public class PrintNum{
	
	 void p_no(int x){
		System.out.println("int:" +x);
		
	}
	 void p_no(float f){
	     
		 System.out.println("Float:"+f);

	}
	void p_no(double d){
	     
		 System.out.println("Double:"+d);

	}
	
     public static void main(String[] args){
		 PrintNum p1= new PrintNum();
		 p1.p_no(10);
		 p1.p_no(11.23f);
		 p1.p_no(12.34);
		 
	 }
		 
		 
}