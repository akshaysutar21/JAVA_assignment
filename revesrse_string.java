class Reverse{
	public static void main(String[] args){
		String s="JAVA By Shrinivas Sir";
		
		String r_c="";
		
		for (int i=s.length()-1;i>=0;i--){
			r_c=r_c+s.charAt(i);
		}
		System.out.println(r_c);
	}
}