// Quick script to apply consistent error handling pattern across edge functions
// This addresses the TypeScript "error is of type unknown" issues

// Pattern to apply:
// } catch (error) {
//   const errorMessage = error instanceof Error ? error.message : String(error);
//   // use errorMessage instead of error.message
// }

console.log('Apply this pattern to fix edge function TypeScript errors');